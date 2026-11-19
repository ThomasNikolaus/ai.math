import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { paths } from "../src/routing.mjs";

const root = path.resolve(import.meta.dirname, "..");
const article = JSON.parse(await fs.readFile(path.join(root, "src/content/ki-horizonte.json"), "utf8"));
const englishArticle = JSON.parse(await fs.readFile(path.join(root, "src/content/ki-horizonte.en.json"), "utf8"));

test("The article retains its full structure, tables, footnotes and source PDF", async () => {
  assert.equal(article.sections.length, 8);
  const body = article.sections.map((section) => section.html).join("\n");
  assert.equal([...body.matchAll(/<table\b/g)].length, 4);
  assert.equal([...body.matchAll(/<t[dh]\b/g)].length, 186);
  assert.equal([...article.footnotesHtml.matchAll(/id="footnote-\d+"/g)].length, 4);
  for (const lang of ["de", "en"]) {
    const translated = lang === "de" ? article : englishArticle;
    const html = await fs.readFile(path.join(root, paths[lang].horizons, "index.html"), "utf8");
    assert.ok(html.includes("Thomas Kahle"));
    assert.ok(html.includes('dateTime="2026-11-17"'));
    assert.ok(html.includes(`class="paper-body horizons-body" lang="${lang}"`));
    assert.ok(!html.includes("Gastbeitrag") && !html.includes("Guest article"));
    assert.ok(html.includes('class="page-heading"'));
    for (const section of translated.sections) {
      assert.ok(html.includes(section.html));
      assert.ok(html.includes(`href="#${section.id}"`));
    }
    assert.ok(html.includes(translated.footnotesHtml));
    const home = await fs.readFile(path.join(root, paths[lang].home, "index.html"), "utf8");
    const resources = await fs.readFile(path.join(root, paths[lang].resources, "index.html"), "utf8");
    for (const entry of [home, resources]) assert.ok(entry.includes('ki-horizonte/') || entry.includes('ai-horizons/'));
  }
  assert.deepEqual(
    await fs.readFile(path.join(root, "assets/ki-horizonte-2026-11-17.pdf")),
    await fs.readFile(path.join(root, "src/documents/ki-horizonte.pdf")),
  );
});

test("Both article languages preserve the same sections, references and table structures", () => {
  assert.deepEqual(englishArticle.sections.map(s => s.id), article.sections.map(s => s.id));
  for (let i = 0; i < article.sections.length; i++) {
    const german = article.sections[i].html;
    const english = englishArticle.sections[i].html;
    const matches = (html, pattern) => [...html.matchAll(pattern)].map(m => m[1]);
    assert.deepEqual(matches(english, /id="([^"]+)"/g), matches(german, /id="([^"]+)"/g));
    assert.deepEqual(matches(english, /href="([^"]+)"/g), matches(german, /href="([^"]+)"/g));
    assert.equal([...english.matchAll(/<t[dh]\b/g)].length, [...german.matchAll(/<t[dh]\b/g)].length);
  }
  assert.match(englishArticle.sections[0].html, /Horizon 6:/);
  assert.match(englishArticle.sections[6].html, /Sovereignty/);
});
