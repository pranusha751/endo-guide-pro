
import { Readable } from 'node:stream';
import server from './server.js';

export default async function handler(req, res) {
  // Convert Node.js req to Web standard Request
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const host = req.headers.host;
  const url = new URL(req.url, `${protocol}://${host}`);
  
  const request = new Request(url, {
    method: req.method,
    headers: req.headers,
    body: ['GET', 'HEAD'].includes(req.method) ? null : Readable.toWeb(req),
    // @ts-ignore
    duplex: 'half'
  });

  try {
    const response = await server.fetch(request);
    
    // Send response back to Node.js res
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
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
}
