
import server from './server.js';

export default async function handler(request) {
  try {
    return await server.fetch(request);
  } catch (error) {
    console.error('SSR Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
