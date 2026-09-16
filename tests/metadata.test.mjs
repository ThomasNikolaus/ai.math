import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { paths } from "../src/routing.mjs";
import { publicationUrl, defaultSiteUrl } from "../scripts/publication.mjs";
import { notFoundPage } from "../scripts/not-found.mjs";

const root = path.resolve(import.meta.dirname, "..");
const cname = await fs.readFile(path.join(root, "CNAME"), "utf8").catch((error) => {
  if (error.code !== "ENOENT") throw error;
});
const base = publicationUrl({ siteUrl: process.env.SITE_URL, cname });
const absolute = (relative) => new URL(relative, base).href;
const unescape = (text) => text.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&lt;", "<");

test("Metadata identifies every indexable page and its translations", async () => {
  const descriptions = new Set();
  for (const [lang, pages] of Object.entries(paths)) {
    for (const [view, directory] of Object.entries(pages)) {
      const html = await fs.readFile(path.join(root, directory, "index.html"), "utf8");
      const head = html.match(/<head>(.*?)<\/head>/s)[1];
      const description = head.match(/name="description" content="([^"]+)"/)?.[1];
      assert.ok(description?.length > 40, `${directory}: missing description`);
      assert.ok(!descriptions.has(description), `${directory}: duplicate description`);
      descriptions.add(description);
      assert.ok(head.includes('name="robots" content="index,follow"'));
      assert.ok(!/noindex|nofollow/i.test(head));
      assert.ok(head.includes(`rel="canonical" href="${absolute(directory)}"`));
      assert.ok(head.includes(`property="og:url" content="${absolute(directory)}"`));
      assert.ok(head.includes(`property="og:description" content="${description}"`));
      for (const other of ["de", "en"]) {
        assert.ok(head.includes(`hreflang="${other}" href="${absolute(paths[other][view])}"`));
      }
      const fallback = absolute(view === "home" ? "" : paths.en[view]);
      assert.ok(head.includes(`hreflang="x-default" href="${fallback}"`));
      assert.ok(head.includes('name="twitter:card" content="summary_large_image"'));
      const image = unescape(head.match(/property="og:image" content="([^"]+)"/)[1]);
      assert.equal(image, absolute(`assets/social-preview-${lang}.png`));
      const bytes = await fs.readFile(path.join(root, `assets/social-preview-${lang}.png`));
      assert.equal(bytes.toString("hex", 0, 8), "89504e470d0a1a0a");
      assert.equal(bytes.readUInt32BE(16), 1200);
      assert.equal(bytes.readUInt32BE(20), 630);
    }
  }
});

test("Publication URL handles the GitHub project and a future CNAME without changing indexing", () => {
  assert.equal(publicationUrl(), defaultSiteUrl);
  assert.equal(publicationUrl({ cname: "ai.math.ms\n" }), "https://ai.math.ms/");
  assert.equal(publicationUrl({ siteUrl: "https://example.org/project" }), "https://example.org/project/");
  assert.equal(publicationUrl({ cname: "ai.math.ms", siteUrl: defaultSiteUrl }), defaultSiteUrl);
  for (const cname of ["https://ai.math.ms", "ai.math.ms/path", "ai.math.ms\nother.example"]) {
    assert.throws(() => publicationUrl({ cname }));
  }
  for (const siteUrl of ["http://example.org", "https://user:secret@example.org", "https://example.org/?x=1", "https://example.org/#x"]) {
    assert.throws(() => publicationUrl({ siteUrl }));
  }
});

test("Sitemap contains exactly the named pages at the publication URL", async () => {
  const xml = await fs.readFile(path.join(root, "sitemap.xml"), "utf8");
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => unescape(match[1]));
  assert.deepEqual(urls, Object.values(paths).flatMap((pages) => Object.values(pages)).map(absolute));
  assert.equal(new Set(urls).size, urls.length);
  const robots = await fs.readFile(path.join(root, "robots.txt"), "utf8");
  assert.ok(robots.includes(`Sitemap: ${absolute("sitemap.xml")}`));
  assert.ok(!/^Disallow:\s*\//m.test(robots), "Public pages must be crawlable");
});

test("The bilingual 404 works at arbitrary nested URLs without JavaScript", async () => {
  assert.equal(await fs.readFile(path.join(root, "404.html"), "utf8"), notFoundPage(base));
  for (const siteUrl of [defaultSiteUrl, "https://ai.math.ms/"]) {
    const html = notFoundPage(siteUrl);
    assert.ok(html.includes('name="robots" content="noindex,nofollow"'));
    assert.ok(!html.includes("<script"));
    assert.ok(html.includes("Seite nicht gefunden") && html.includes("Page not found"));
    for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const resolved = new URL(match[1], new URL("deep/missing/page/", siteUrl));
      assert.ok(resolved.href.startsWith(siteUrl));
      await fs.access(path.join(root, resolved.href.slice(siteUrl.length).replace(/\/$/, "/index.html")));
    }
  }
});

test("Icons have usable raster sizes and the root has site information", async () => {
  for (const [filename, size] of [["favicon.png", 64], ["apple-touch-icon.png", 180]]) {
    const bytes = await fs.readFile(path.join(root, "assets", filename));
    assert.equal(bytes.readUInt32BE(16), size);
    assert.equal(bytes.readUInt32BE(20), size);
  }
  const html = await fs.readFile(path.join(root, "index.html"), "utf8");
  const site = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
  assert.equal(site["@type"], "WebSite");
  assert.equal(site.url, base);
  assert.deepEqual(site.inLanguage, ["de", "en"]);
});
