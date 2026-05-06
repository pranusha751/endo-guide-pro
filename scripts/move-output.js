import fs from "fs";
import path from "path";
import { buildSync } from "esbuild";

const distClient = path.join(process.cwd(), "dist", "client");
const distServer = path.join(process.cwd(), "dist", "server");
const vercelOutput = path.join(process.cwd(), ".vercel", "output");

// Create .vercel/output structure
if (fs.existsSync(vercelOutput)) {
  fs.rmSync(vercelOutput, { recursive: true });
}
fs.mkdirSync(path.join(vercelOutput, "static"), { recursive: true });
fs.mkdirSync(path.join(vercelOutput, "functions", "index.func"), { recursive: true });

// Copy static assets
if (fs.existsSync(distClient)) {
  fs.cpSync(distClient, path.join(vercelOutput, "static"), { recursive: true });
}

// Copy server file to a local name within the function directory
const funcDir = path.join(vercelOutput, "functions", "index.func");
if (fs.existsSync(path.join(distServer, "server.js"))) {
  fs.copyFileSync(path.join(distServer, "server.js"), path.join(funcDir, "server.js"));
}

// Copy server assets (important for TanStack Start routing)
const serverAssets = path.join(distServer, "assets");
if (fs.existsSync(serverAssets)) {
  fs.cpSync(serverAssets, path.join(funcDir, "assets"), { recursive: true });
}

// Create index.js wrapper that Vercel can execute
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
    console.error('SSR Critical Error:', error);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.end('Internal Server Error: ' + error.message);
    }
  }
}
`;

// ...
// Write wrapper to a temporary file
const tempWrapper = path.join(funcDir, "wrapper.mjs");
fs.writeFileSync(tempWrapper, wrapper);

// Bundle the wrapper and server logic into the final index.mjs
console.log("Bundling function with esbuild...");
try {
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
  // Clean up temporary wrapper
  fs.unlinkSync(tempWrapper);
} catch (err) {
  console.error("Bundling failed:", err);
  process.exit(1);
}

const vcConfig = {
  runtime: "nodejs20.x",
  handler: "index.mjs",
  launcherType: "Nodejs",
};
fs.writeFileSync(path.join(funcDir, ".vc-config.json"), JSON.stringify(vcConfig, null, 2));

// Create routing config (config.json)
const config = {
  version: 3,
  routes: [{ handle: "filesystem" }, { src: "/(.*)", dest: "/index" }],
};
fs.writeFileSync(path.join(vercelOutput, "config.json"), JSON.stringify(config, null, 2));

if (fs.existsSync(path.join(funcDir, "index.mjs"))) {
  const stats = fs.statSync(path.join(funcDir, "index.mjs"));
  console.log(`Successfully bundled: index.mjs (${(stats.size / 1024).toFixed(2)} KB)`);
}

console.log("Successfully created and bundled .vercel/output structure");
