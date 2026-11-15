import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dist = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'dist',
);
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ttf': 'font/ttf',
  '.webp': 'image/webp',
};
http
  .createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://localhost');
      let pathname = decodeURIComponent(url.pathname);
      if (pathname.endsWith('/')) pathname += 'index.html';
      let file = path.resolve(dist, '.' + pathname);
      if (file !== dist && !file.startsWith(dist + path.sep)) {
        res.writeHead(403);
        return res.end('Forbidden');
      }
      let data;
      try {
        data = await fs.readFile(file);
      } catch {
        file = path.join(dist, '404.html');
        data = await fs.readFile(file);
        res.statusCode = 404;
      }
      res.setHeader(
        'Content-Type',
        mime[path.extname(file)] || 'application/octet-stream',
      );
      res.setHeader('Cache-Control', 'no-store');
      res.end(data);
    } catch {
      res.writeHead(400);
      res.end('Bad request');
    }
  })
  .listen(4173, '127.0.0.1', () =>
    console.log('Portfolio available at http://127.0.0.1:4173'),
  );
