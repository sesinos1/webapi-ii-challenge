const express = require('express');

const postRouter = require('../posts/posts_router');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda </h>
    <p>Welcome API</p>
  `);
});

server.use('/api/posts', postRouter);

module.exports = server;