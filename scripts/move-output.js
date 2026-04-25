import fs from 'fs';
import path from 'path';

const distClient = path.join(process.cwd(), 'dist', 'client');
const distServer = path.join(process.cwd(), 'dist', 'server');
const vercelOutput = path.join(process.cwd(), '.vercel', 'output');

// Create .vercel/output structure
if (fs.existsSync(vercelOutput)) {
  fs.rmSync(vercelOutput, { recursive: true });
}
fs.mkdirSync(path.join(vercelOutput, 'static'), { recursive: true });
fs.mkdirSync(path.join(vercelOutput, 'functions', 'index.func'), { recursive: true });

// Copy static assets
if (fs.existsSync(distClient)) {
  fs.cpSync(distClient, path.join(vercelOutput, 'static'), { recursive: true });
}

// Copy server function
if (fs.existsSync(path.join(distServer, 'server.js'))) {
  fs.copyFileSync(
    path.join(distServer, 'server.js'),
    path.join(vercelOutput, 'functions', 'index.func', 'index.js')
  );
}

// Create .vc-config.json for the server function
const vcConfig = {
  runtime: 'nodejs20.x',
  handler: 'index.js',
  launcherType: 'Nodejs',
};
fs.writeFileSync(
  path.join(vercelOutput, 'functions', 'index.func', '.vc-config.json'),
  JSON.stringify(vcConfig, null, 2)
);

// Create routing config (config.json)
const config = {
  version: 3,
  routes: [
    { handle: 'filesystem' },
    { src: '/(.*)', dest: 'index' }
  ]
};
fs.writeFileSync(
  path.join(vercelOutput, 'config.json'),
  JSON.stringify(config, null, 2)
);

console.log('Successfully created .vercel/output structure');
