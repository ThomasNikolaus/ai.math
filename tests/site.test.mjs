import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import {
  paths,
  rootPrefixFor,
  siteLink,
  resolveLanguage,
  legacyDestination,
} from "../src/routing.mjs";

const root = path.resolve(import.meta.dirname, "..");
const manifest = JSON.parse(await fs.readFile(path.join(root, "generated-files.json"), "utf8"));
const documents = new Map(
  await Promise.all(
    manifest
      .filter((name) => name.endsWith(".html"))
      .map(async (name) => [name, await fs.readFile(path.join(root, name), "utf8")]),
  ),
);
const unescape = (text) =>
  text
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");

test("Every page and internal anchor works at the domain root and at the GitHub project path", async () => {
  assert.equal(documents.size, 13);
  for (const base of ["https://example.org/", "https://example.org/ai.math/"]) {
    for (const [filename, html] of documents) {
      const current = new URL(filename, base);
      for (const match of html.matchAll(/\b(?:href|src)=(['"])(.*?)\1/g)) {
        const destination = new URL(unescape(match[2]), current);
        if (destination.origin !== current.origin) continue;
        assert.ok(
          destination.pathname.startsWith(new URL(base).pathname),
          `${filename}: link leaves site root: ${match[2]}`,
        );
        const relative = decodeURIComponent(
          destination.pathname.slice(new URL(base).pathname.length),
        );
        const target = relative.endsWith("/") ? relative + "index.html" : relative;
        await fs.access(path.join(root, target));
        if (destination.hash && documents.has(target)) {
          const id = decodeURIComponent(destination.hash.slice(1));
          assert.ok(
            documents.get(target).includes(`id="${id}"`),
            `${filename}: missing anchor ${match[2]}`,
          );
        }
      }
    }
  }
});

test("Questions and all perspectives are present in the initial HTML in both languages", async () => {
  const questions = JSON.parse(
    await fs.readFile(path.join(root, "src/content/questions.json"), "utf8"),
  );
  const perspectives = JSON.parse(
    await fs.readFile(path.join(root, "src/content/perspectives.json"), "utf8"),
  );
  for (const lang of ["de", "en"]) {
    const html = documents.get(paths[lang].questions + "index.html");
    const text = unescape(html.replace(/<[^>]*>/g, ""));
    assert.equal((html.match(/data-slot="accordion-trigger"/g) || []).length, 30);
    assert.equal((html.match(/class="perspective"/g) || []).length, 133);
    for (const group of questions)
      for (const question of group.questions) {
        assert.ok(text.includes(question.text[lang]), `Missing question ${question.id} (${lang})`);
        for (const perspective of perspectives.questions[question.id].perspectives) {
          assert.ok(
            text.includes(perspective.body[lang]),
            `Missing perspective in question ${question.id} (${lang})`,
          );
        }
      }
  }
});

test("Padlet remains opt-in and existing indexing preference is preserved", () => {
  for (const [filename, html] of documents) {
    assert.ok(!/<iframe\b/i.test(html), `Unexpected external frame in ${filename}`);
    assert.ok(html.includes('name="robots" content="noindex,nofollow"'));
  }
});

test("Navigation maps every view and language within the current deployment", () => {
  for (const lang of ["de", "en"])
    for (const [view, directory] of Object.entries(paths[lang])) {
      for (const base of ["https://example.org/", "https://example.org/ai.math/"]) {
        const current = new URL(directory, base);
        const other = lang === "de" ? "en" : "de";
        assert.equal(
          new URL(siteLink(rootPrefixFor(directory), other, view, "principle-1"), current).href,
          new URL(paths[other][view] + "#principle-1", base).href,
        );
      }
      assert.equal(
        legacyDestination(`#/${lang}/${view}/principle-1`, "en"),
        directory + "#principle-1",
      );
    }
  assert.equal(legacyDestination("#/de/research/principle-2", "en"), "de/forschung/#principle-2");
  assert.equal(legacyDestination("#principle-1", "de"), null);
  assert.equal(legacyDestination("#/de/missing", "en"), "de/");
  assert.equal(resolveLanguage("de", "en", "en-US"), "de");
  assert.equal(resolveLanguage(null, "de", "en-US"), "de");
  assert.equal(resolveLanguage(null, null, "de-DE"), "de");
  assert.equal(resolveLanguage(null, null, "fr-FR"), "en");
});

test("The actual browser redirect preserves old links and query strings", async () => {
  const script = await fs.readFile(
    path.join(
      root,
      manifest.find((name) => /^assets\/route-.*\.js$/.test(name)),
    ),
    "utf8",
  );
  const redirect = (href, entry, prefix, stored, denied = false) => {
    let destination;
    const location = new URL(href);
    location.replace = (value) => {
      destination = value;
    };
    vm.runInNewContext(script, {
      URL,
      location,
      document: { documentElement: { dataset: { root: prefix, entry: String(entry) } } },
      navigator: { languages: ["de-DE"], language: "de-DE" },
      localStorage: {
        getItem() {
          if (denied) throw new Error("Storage denied");
          return stored;
        },
      },
    });
    return destination;
  };
  assert.equal(
    redirect("https://example.org/ai.math/?from=email#/en/papers/principle-3", true, "./"),
    "https://example.org/ai.math/en/research/?from=email#principle-3",
  );
  assert.equal(redirect("https://example.org/", true, "./", "en"), "https://example.org/en/");
  assert.equal(
    redirect("https://example.org/ai.math/", true, "./", null, true),
    "https://example.org/ai.math/de/",
  );
  assert.equal(
    redirect("https://example.org/en/research/#principle-3", false, "../../", "de"),
    undefined,
  );
});
