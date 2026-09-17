import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execute = promisify(execFile);
const root = path.resolve(import.meta.dirname, "..");

test("Cached pages retain their CSS, scripts and shared chunks across later builds", async (t) => {
  const temporary = await fs.mkdtemp(path.join(os.tmpdir(), "ai-math-build-cache-"));
  t.after(() => fs.rm(temporary, { recursive: true, force: true }));
  for (const name of ["scripts", "src", "package.json", "CNAME"]) {
    await fs.cp(path.join(root, name), path.join(temporary, name), { recursive: true });
  }
  await fs.symlink(await fs.realpath(path.join(root, "node_modules")), path.join(temporary, "node_modules"), "dir");
  const build = () => execute(process.execPath, ["scripts/build.mjs"], { cwd: temporary });
  const read = (name) => fs.readFile(path.join(temporary, name), "utf8");
  const manifest = async () => JSON.parse(await read("generated-files.json"));

  await build();
  const firstHtml = await read("en/index.html");
  const originalAssets = new Map(await Promise.all(
    (await manifest()).filter((name) => /^assets\/.*\.(css|js)$/.test(name))
      .map(async (name) => [name, await read(name)]),
  ));
  assert.ok([...originalAssets.keys()].some((name) => name.startsWith("assets/shared-")));
  const originalCname = await read("CNAME");
  await fs.writeFile(path.join(temporary, "notes.txt"), "User-owned file");
  await fs.mkdir(path.join(temporary, "de/retired"), { recursive: true });
  await fs.writeFile(path.join(temporary, "de/retired/index.html"), "Obsolete generated page");
  await fs.writeFile(path.join(temporary, "generated-files.json"), JSON.stringify([
    ...await manifest(), "de/retired/index.html",
  ]));

  for (let revision = 1; revision <= 2; revision++) {
    await fs.appendFile(path.join(temporary, "src/styles.css"), `\n/* Cache regression ${revision} */\n`);
    const content = JSON.parse(await read("src/content/home.json"));
    content.en[0] += ` Revision ${revision}.`;
    await fs.writeFile(path.join(temporary, "src/content/home.json"), JSON.stringify(content));
    await build();
    const latestHtml = await read("en/index.html");
    for (const pattern of [/rel="stylesheet" href="([^"]+)"/, /type="module" src="([^"]+)"/]) {
      assert.notEqual(latestHtml.match(pattern)[1], firstHtml.match(pattern)[1]);
    }
    const published = new Set(await manifest());
    for (const [name, bytes] of originalAssets) {
      assert.ok(published.has(name), `Cached asset missing from publication: ${name}`);
      assert.equal(await read(name), bytes, `Cached asset changed: ${name}`);
    }
  }
  await assert.rejects(fs.access(path.join(temporary, "de/retired/index.html")), { code: "ENOENT" });
  assert.equal(await read("CNAME"), originalCname);
  assert.equal(await read("notes.txt"), "User-owned file");
});
