import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const { default: serverEntry } = await import("./dist/server/server.js");

const PORT = parseInt(process.env.PORT || "3000", 10);
const STATIC_DIR = join(__dirname, "dist/client");

const MIME = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".mjs": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".webmanifest": "application/manifest+json",
  ".txt": "text/plain",
};

const nodeServer = createServer(async (req, res) => {
  try {
    const url = req.url || "/";
    const urlPath = url.split("?")[0];

    // Serve static files
    const staticPath = join(STATIC_DIR, urlPath);
    if (existsSync(staticPath) && urlPath !== "/") {
      const ext = extname(staticPath);
      const contentType = MIME[ext] || "application/octet-stream";
      try {
        const content = await readFile(staticPath);
        res.writeHead(200, { "Content-Type": contentType, "Cache-Control": "public, max-age=31536000" });
        res.end(content);
        return;
      } catch {}
    }

    // Forward to TanStack Start SSR handler
    const proto = req.headers["x-forwarded-proto"] || "http";
    const host = req.headers.host || `localhost:${PORT}`;
    const fullUrl = `${proto}://${host}${url}`;

    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (value !== undefined) {
        Array.isArray(value)
          ? value.forEach((v) => headers.append(key, v))
          : headers.set(key, value);
      }
    }

    const hasBody = !["GET", "HEAD", "OPTIONS"].includes(req.method || "GET");
    const request = new Request(fullUrl, {
      method: req.method || "GET",
      headers,
      ...(hasBody ? { body: req, duplex: "half" } : {}),
    });

    const response = await serverEntry.fetch(request);

    const responseHeaders = {};
    response.headers.forEach((value, key) => { responseHeaders[key] = value; });
    res.writeHead(response.status, responseHeaders);

    if (response.body) {
      const reader = response.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
    }
    res.end();
  } catch (err) {
    console.error("Server error:", err);
    if (!res.headersSent) res.writeHead(500);
    res.end("Internal Server Error");
  }
});

nodeServer.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
