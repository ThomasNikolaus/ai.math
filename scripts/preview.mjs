import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const port = Number(process.env.PORT || 4173);
const mount = process.env.PREVIEW_BASE || "/";
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};
http
  .createServer(async (request, response) => {
    try {
      const url = new URL(request.url, "http://localhost");
      const pathname = decodeURIComponent(url.pathname);
      if (!pathname.startsWith(mount)) {
        response.writeHead(404);
        response.end("Not found");
        return;
      }
      let relative = pathname.slice(mount.length).replace(/^\//, "");
      let filename = path.resolve(root, relative || ".");
      if (filename !== root && !filename.startsWith(root + path.sep))
        throw new Error("Invalid path");
      if ((await fs.stat(filename)).isDirectory()) {
        if (!pathname.endsWith("/")) {
          response.writeHead(301, { Location: pathname + "/" + url.search });
          response.end();
          return;
        }
        filename = path.join(filename, "index.html");
      }
      const bytes = await fs.readFile(filename);
      response.writeHead(200, {
        "Content-Type": mime[path.extname(filename)] || "application/octet-stream",
        "Cache-Control": "no-store",
      });
      response.end(bytes);
    } catch {
      const notFound = await fs.readFile(path.join(root, "404.html")).catch(() => "Not found");
      response.writeHead(404, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
      response.end(notFound);
    }
  })
  .listen(port, "127.0.0.1", () => console.log(`Preview: http://127.0.0.1:${port}${mount}`));
