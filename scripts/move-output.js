import fs from "fs";
import path from "path";
import { buildSync } from "esbuild";

const vercelOutput = path.join(process.cwd(), ".vercel", "output");
const funcDir = path.join(vercelOutput, "functions", "render.func");
const staticDir = path.join(vercelOutput, "static");

// 1. Clean and Create Dirs
if (fs.existsSync(vercelOutput)) fs.rmSync(vercelOutput, { recursive: true });
fs.mkdirSync(funcDir, { recursive: true });
fs.mkdirSync(staticDir, { recursive: true });

// 2. Copy Static Assets
const distClient = path.join(process.cwd(), "dist", "client");
if (fs.existsSync(distClient)) {
  fs.cpSync(distClient, staticDir, { recursive: true });
}

// 3. Create SSR Wrapper
const wrapper = `
import { Readable } from 'node:stream';
import server from './server.js';

export default async function handler(req, res) {
  try {
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost';
    const url = new URL(req.url || '/', \`\${protocol}://\${host}\`);
    
    const request = new Request(url, {
      method: req.method || 'GET',
      headers: req.headers,
      body: ['GET', 'HEAD'].includes(req.method || 'GET') ? undefined : Readable.toWeb(req),
      // @ts-ignore
      duplex: 'half'
    });

    const response = await server.fetch(request);
    
    res.statusCode = response.status;
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });
    
    if (response.body) {
      const reader = response.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
    }
    res.end();
  } catch (error) {
    console.error('SSR Error:', error);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.end('Internal Error: ' + error.message);
    }
  }
}
`;

const tempWrapper = path.join(funcDir, "wrapper.mjs");
fs.writeFileSync(tempWrapper, wrapper);

// Copy server.js for bundling
const distServer = path.join(process.cwd(), "dist", "server");
fs.copyFileSync(path.join(distServer, "server.js"), path.join(funcDir, "server.js"));

// 4. Bundle
console.log("Bundling SSR function...");
buildSync({
  entryPoints: [tempWrapper],
  bundle: true,
  outfile: path.join(funcDir, "index.mjs"),
  platform: "node",
  format: "esm",
  target: "node20",
  external: ["node:*"],
  banner: {
    js: "import { createRequire } from 'module'; const require = createRequire(import.meta.url);",
  },
});

fs.unlinkSync(tempWrapper);
fs.unlinkSync(path.join(funcDir, "server.js"));

// 5. Configs
fs.writeFileSync(path.join(funcDir, ".vc-config.json"), JSON.stringify({
  runtime: "nodejs20.x",
  handler: "index.mjs",
  launcherType: "Nodejs"
}, null, 2));

const config = {
  version: 3,
  routes: [
    { handle: "filesystem" },
    { src: "/(.*)", dest: "/render" }
  ]
};
fs.writeFileSync(path.join(vercelOutput, "config.json"), JSON.stringify(config, null, 2));

console.log("Successfully created .vercel/output");
