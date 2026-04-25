import { existsSync } from 'fs';
import { join } from 'path';

export default async function handler(request) {
  const serverPath = join(process.cwd(), 'dist', 'server', 'server.js');
  
  if (!existsSync(serverPath)) {
    return new Response('Server build not found. Please ensure the build completed successfully.', { status: 500 });
  }

  const { default: server } = await import('../dist/server/server.js');
  
  try {
    return await server.fetch(request);
  } catch (error) {
    console.error('SSR Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}


export const config = {
  runtime: 'nodejs',
};
