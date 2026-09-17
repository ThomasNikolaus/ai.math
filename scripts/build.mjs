import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { createHash } from "node:crypto";
import { build } from "esbuild";
import { paths, rootPrefixFor } from "../src/routing.mjs";
import { descriptions, siteNames } from "../src/metadata.mjs";
import { publicationUrl } from "./publication.mjs";
import { notFoundPage } from "./not-found.mjs";

const root = path.resolve(import.meta.dirname, "..");
let cname;
try {
  cname = await fs.readFile(path.join(root, "CNAME"), "utf8");
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}
const siteUrl = publicationUrl({ siteUrl: process.env.SITE_URL, cname });
const absolute = (relative) => new URL(relative, siteUrl).href;
process.env.NODE_ENV = "production";
const temporary = path.join(root, ".build");
await fs.mkdir(temporary, { recursive: true });
const entries = {
  home: ["home", "Landing"],
  papers: ["research", "PositionPaper"],
  teaching: ["education", "TeachingPaper"],
  questions: ["questions", "Questions"],
  experiences: ["discussion", "Experiences"],
  resources: ["resources", "Resources"],
  imprint: ["imprint", "Imprint"],
  privacy: ["privacy", "Privacy"],
};
for (const [view, [module, component]] of Object.entries(entries)) {
  await fs.writeFile(
    path.join(temporary, view + ".tsx"),
    `import {hydratePage} from "../src/client";import {${component}} from "../src/pages/${module}";hydratePage(${component});\n`,
  );
}

const common = {
  absWorkingDir: root,
  bundle: true,
  jsx: "automatic",
  target: "es2020",
  logLevel: "warning",
  define: { "process.env.NODE_ENV": '"production"' },
};
await build({
  ...common,
  entryPoints: ["scripts/render.tsx"],
  outfile: ".build/render.mjs",
  platform: "node",
  format: "esm",
  packages: "external",
});
const { renderPage } = await import(
  pathToFileURL(path.join(temporary, "render.mjs")) + "?build=" + Date.now()
);
const generated = new Map();
const output = await build({
  ...common,
  entryPoints: Object.fromEntries(
    Object.keys(entries).map((view) => [view, ".build/" + view + ".tsx"]),
  ),
  outdir: "assets",
  entryNames: "[name]-[hash]",
  chunkNames: "shared-[hash]",
  splitting: true,
  platform: "browser",
  format: "esm",
  minify: true,
  write: false,
  metafile: true,
});
const pageScripts = {};
for (const [name, metadata] of Object.entries(output.metafile.outputs)) {
  if (metadata.entryPoint) pageScripts[path.basename(metadata.entryPoint, ".tsx")] = name;
}
for (const file of output.outputFiles) generated.set(path.relative(root, file.path), file.contents);
const redirect = await build({
  ...common,
  entryPoints: ["src/redirect.js"],
  outfile: "assets/route.js",
  format: "iife",
  platform: "browser",
  minify: true,
  write: false,
});
const hashName = (name, bytes, extension) =>
  `assets/${name}-${createHash("sha256").update(bytes).digest("hex").slice(0, 12)}.${extension}`;
const redirectName = hashName("route", redirect.outputFiles[0].contents, "js");
generated.set(redirectName, redirect.outputFiles[0].contents);
const style = await fs.readFile(path.join(root, "src/styles.css"));
const styleName = hashName("site", style, "css");
generated.set(styleName, style);
for (const name of ["favicon.svg", "favicon.png", "apple-touch-icon.png", "social-preview-de.png", "social-preview-en.png"]) {
  generated.set("assets/" + name, await fs.readFile(path.join(root, "src", name)));
}

const escape = (value) =>
  value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
function documentFor(route, entry = false) {
  const { title, html } = renderPage(route);
  const prefix = route.rootPrefix;
  const description = descriptions[route.lang][route.view];
  const canonical = absolute(paths[route.lang][route.view]);
  const preview = absolute(`assets/social-preview-${route.lang}.png`);
  const locale = route.lang === "de" ? "de_DE" : "en_US";
  const alternate = Object.keys(paths)
    .map(
      (lang) =>
        `<link rel="alternate" hreflang="${lang}" href="${absolute(paths[lang][route.view])}">`,
    )
    .join("") + `<link rel="alternate" hreflang="x-default" href="${absolute(route.view === "home" ? "" : paths.en[route.view])}">`;
  const structuredData = entry ? `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org", "@type": "WebSite", name: siteNames.en,
    alternateName: siteNames.de, url: siteUrl, inLanguage: ["de", "en"],
  }).replaceAll("<", "\\u003c")}</script>` : "";
  // Content pages are open to search engines; the separate 404 page stays noindex.
  return `<!doctype html><html lang="${route.lang}" data-root="${prefix}"${entry ? ' data-entry="true"' : ""}><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="index,follow"><title>${escape(title)}</title><meta name="description" content="${escape(description)}"><link rel="canonical" href="${canonical}"><link rel="icon" type="image/png" sizes="64x64" href="${prefix}assets/favicon.png"><link rel="icon" type="image/svg+xml" href="${prefix}assets/favicon.svg"><link rel="apple-touch-icon" sizes="180x180" href="${prefix}assets/apple-touch-icon.png"><meta name="theme-color" content="#920055"><link rel="stylesheet" href="${prefix}${styleName}">${alternate}<meta property="og:type" content="website"><meta property="og:site_name" content="${escape(siteNames[route.lang])}"><meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:url" content="${canonical}"><meta property="og:locale" content="${locale}"><meta property="og:locale:alternate" content="${route.lang === "de" ? "en_US" : "de_DE"}"><meta property="og:image" content="${preview}"><meta property="og:image:type" content="image/png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="${escape(siteNames[route.lang])}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escape(title)}"><meta name="twitter:description" content="${escape(description)}"><meta name="twitter:image" content="${preview}"><meta name="twitter:image:alt" content="${escape(siteNames[route.lang])}">${structuredData}<script src="${prefix}${redirectName}"></script></head><body><div id="root">${html}</div><script id="page-route" type="application/json">${JSON.stringify(route).replaceAll("<", "\\u003c")}</script><script type="module" src="${prefix}${pageScripts[route.view]}"></script></body></html>\n`;
}
for (const [lang, pages] of Object.entries(paths)) {
  for (const [view, directory] of Object.entries(pages)) {
    generated.set(
      directory + "index.html",
      documentFor({ lang, view, rootPrefix: rootPrefixFor(directory) }),
    );
  }
}
generated.set("index.html", documentFor({ lang: "en", view: "home", rootPrefix: "./" }, true));
generated.set(".nojekyll", "");
generated.set("404.html", notFoundPage(siteUrl));
generated.set("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${Object.values(paths).flatMap((pages) => Object.values(pages)).map((directory) => `  <url><loc>${escape(absolute(directory))}</loc></url>`).join("\n")}\n</urlset>\n`);
// Let crawlers discover the public pages through the sitemap.
generated.set("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${absolute("sitemap.xml")}\n`);

// Cached HTML can still request the previous release's CSS and JavaScript.
// Keep fingerprinted assets, including shared chunks, at their immutable URLs.
let previous = [];
try {
  previous = JSON.parse(await fs.readFile(path.join(root, "generated-files.json"), "utf8"));
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}
for (const filename of previous) {
  if (
    !generated.has(filename) &&
    /^assets\/[a-z][a-z0-9-]*-(?:[0-9a-f]{12}|[A-Z0-9]{8})\.(?:css|js)$/.test(filename)
  ) {
    generated.set(filename, await fs.readFile(path.join(root, filename)));
  }
  // Delete only obsolete generated files, never CNAME or user-owned files.
  if (
    !generated.has(filename) &&
    /^(assets|de|en)\//.test(filename) &&
    !filename.split("/").includes("..")
  ) {
    await fs.rm(path.join(root, filename), { force: true });
  }
}
for (const [filename, contents] of generated) {
  const destination = path.join(root, filename);
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.writeFile(destination, contents);
}
await fs.writeFile(
  path.join(root, "generated-files.json"),
  JSON.stringify([...generated.keys()].sort(), null, 2) + "\n",
);
console.log(`Built ${Object.values(paths).reduce((count, pages) => count + Object.keys(pages).length, 0)} HTML pages, the language entry page, and shared assets.`);
