// console.log("hey from the server");

import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

//const express = require("express")
import express from 'express';
import { ENV } from './lib/env.js';
import path from 'path';
import { connectDB } from './lib/db.js';

// console.log(ENV.PORT);
// console.log(ENV.DB_URL);

const app = express();
const __dirname = path.resolve();
//用了 "type": "module"，切换到 ES Module 之后，__dirname 就消失了，直接用会报错。
// 所以用这行代码手动模拟

app.get('/health', (req, res) => {
  res.status(200).json({ msg: 'api is up and running' });
});
app.get('/books', (req, res) => {
  res.status(200).json({ msg: 'this is the bools endpoint' });
});

//make our app ready for deployment
if (ENV.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('/{*any}', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
  });
}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () =>
      console.log('Server is running on port:', ENV.PORT),
    );
  } catch {
    console.error('😭 Error starting the server', error);
  }
};

startServer();
