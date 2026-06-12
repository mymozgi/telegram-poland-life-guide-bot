import http from 'http';
import Database from 'better-sqlite3';
import { config } from '../config';
import { getStats } from '../analytics/tracker';

export function startStatsServer(db: Database.Database): void {
  const server = http.createServer((req, res) => {
    if (req.url === '/stats' && req.method === 'GET') {
      try {
        const stats = getStats(db);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(stats, null, 2));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal server error' }));
      }
    } else if (req.url === '/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'ok' }));
    } else {
      res.writeHead(404);
      res.end('Not found');
    }
  });

  server.listen(config.STATS_PORT, () => {
    console.log(`Stats server running on http://localhost:${config.STATS_PORT}/stats`);
  });
}
