// Gọi file bot chính để chạy bot Discord
import './SkinPeek.js';

import http from 'http';
const PORT = process.env.PORT || 8080;

// Tạo 1 HTTP server đơn giản để Render detect "bot is running"
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot is running!\n');
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🌍 HTTP server running on port ${PORT}`);
});
