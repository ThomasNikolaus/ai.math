import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import {
  paths,
  legacyDiscussionPaths,
  legacyQuestionPaths,
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
  assert.equal(documents.size, 18);
  for (const base of ["https://example.org/", "https://example.org/ai.math/"]) {
    for (const [filename, html] of documents) {
      if (filename === "404.html") continue; // Uses absolute publication URLs for arbitrary request paths.
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

test("Only legacy redirects and the error page are excluded from indexing", () => {
  const legacyFiles = new Set(
    [legacyDiscussionPaths, legacyQuestionPaths]
      .flatMap((legacyPaths) => Object.values(legacyPaths))
      .map((directory) => directory + "index.html"),
  );
  for (const [filename, html] of documents) {
    assert.ok(!/<iframe\b/i.test(html), `Unexpected external frame in ${filename}`);
    const policy = filename === "404.html" || legacyFiles.has(filename)
      ? "noindex,nofollow"
      : "index,follow";
    const robots = [...html.matchAll(/<meta\s+name="(?:robots|googlebot)"\s+content="([^"]+)"/g)];
    assert.deepEqual(robots.map((match) => match[1]), [policy], `${filename}: unexpected indexing policy`);
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
  assert.equal(legacyDestination("#/de/experiences", "en"), "de/");
  assert.equal(legacyDestination("#/en/discussion", "de"), "en/");
  assert.equal(legacyDestination("#/de/questions", "en"), "de/");
  assert.equal(legacyDestination("#/en/questions", "de"), "en/");
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


test("The legal notice is directly linked from the footer of every page", () => {
  const legacyFiles = new Set(
    [legacyDiscussionPaths, legacyQuestionPaths]
      .flatMap((legacyPaths) => Object.values(legacyPaths))
      .map((directory) => directory + "index.html"),
  );
  for (const [filename, html] of documents) {
    if (filename === "404.html" || legacyFiles.has(filename)) continue;
    const footer = html.match(/<footer class="site-footer">(.*?)<\/footer>/s)?.[1];
    assert.ok(footer, `Missing footer: ${filename}`);
    const href = footer.match(/href="([^"]+)"/)?.[1];
    const lang = html.match(/<html lang="([^"]+)"/)?.[1];
    const current = new URL(filename, "https://example.org/ai.math/");
    assert.equal(new URL(href, current).href, new URL(paths[lang].imprint, "https://example.org/ai.math/").href);
    assert.ok(footer.includes(lang === "de" ? "Impressum" : "Legal notice"));
    const privacyHref = footer.match(/href="([^"]+)"[^>]*>(?:Datenschutz|Privacy)<\/a>/)?.[1];
    assert.equal(new URL(privacyHref, current).href, new URL(paths[lang].privacy, "https://example.org/ai.math/").href);
  }
});

test("Legacy removed-page URLs redirect to the language home page and stay out of the sitemap", async () => {
  const sitemap = await fs.readFile(path.join(root, "sitemap.xml"), "utf8");
  for (const legacyPaths of [legacyDiscussionPaths, legacyQuestionPaths]) {
    for (const [lang, directory] of Object.entries(legacyPaths)) {
      const filename = directory + "index.html";
      const html = documents.get(filename);
      assert.ok(html, `Missing legacy redirect: ${filename}`);
      assert.ok(html.includes('<meta name="robots" content="noindex,nofollow">'));
      assert.ok(html.includes('<meta http-equiv="refresh" content="0;url=../">'));
      assert.ok(html.includes(`<link rel="canonical" href="https://ai.math.ms/${paths[lang].home}">`));
      assert.ok(!sitemap.includes(directory));
    }
  }
});
