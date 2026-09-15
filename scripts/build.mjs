import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { createHash } from "node:crypto";
import { build } from "esbuild";
import { paths, rootPrefixFor } from "../src/routing.mjs";

const root = path.resolve(import.meta.dirname, "..");
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
generated.set("assets/favicon.svg", await fs.readFile(path.join(root, "src/favicon.svg")));

const escape = (value) =>
  value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
function documentFor(route, entry = false) {
  const { title, html } = renderPage(route);
  const prefix = route.rootPrefix;
  const alternate = Object.keys(paths)
    .map(
      (lang) =>
        `<link rel="alternate" hreflang="${lang}" href="${prefix}${paths[lang][route.view]}">`,
    )
    .join("");
  return `<!doctype html><html lang="${route.lang}" data-root="${prefix}"${entry ? ' data-entry="true"' : ""}><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${escape(title)}</title><link rel="icon" href="${prefix}assets/favicon.svg"><link rel="stylesheet" href="${prefix}${styleName}">${alternate}<script src="${prefix}${redirectName}"></script></head><body><div id="root">${html}</div><script id="page-route" type="application/json">${JSON.stringify(route).replaceAll("<", "\\u003c")}</script><script type="module" src="${prefix}${pageScripts[route.view]}"></script></body></html>\n`;
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

// Delete only files written by an earlier build, never CNAME or user-owned files.
let previous = [];
try {
  previous = JSON.parse(await fs.readFile(path.join(root, "generated-files.json"), "utf8"));
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}
for (const filename of previous) {
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
console.log("Built 12 HTML pages, the language entry page, and shared assets.");
