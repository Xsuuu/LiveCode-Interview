// // console.log("hey from the server");

// import dns from 'dns';
// dns.setServers(['8.8.8.8', '8.8.4.4']);

// //const express = require("express")
// import express from 'express';
// import path from 'path';
// import cors from 'cors';
// import { serve } from 'inngest/express';
// import { clerkMiddleware } from '@clerk/express';

// import { ENV } from './lib/env.js';
// import { connectDB } from './lib/db.js';
// import { inngest, functions } from './lib/inngest.js';
// import { protectRoute } from './middleware/protectRoute.js';

// // console.log(ENV.PORT);
// // console.log(ENV.DB_URL);

// const app = express();
// const __dirname = path.resolve();
// //用了 "type": "module"，切换到 ES Module 之后，__dirname 就消失了，直接用会报错。
// // 所以用这行代码手动模拟

// //middleware
// app.use(express.json());
// app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
// //允许携带cookie/token
// app.use(clerkMiddleware());
// //this adds auth field to request object:req.auth()
// app.use('/api/inngest', serve({ client: inngest, functions }));

// app.get('/health', (req, res) => {
//   req.auth;
//   res.status(200).json({ msg: 'api is up and running' });
// });
// // app.get('/books', (req, res) => {
// //   res.status(200).json({ msg: 'this is books endpoint' });
// // });
// //when u pass an array of middleware to Express, it automatically flattens and executes
// //them sequentially, one by one
// // app.get('/video-calls',protectRoute, (req, res) => {
// //   // console.log(req.user);
// //   res.status(200).json({ msg: 'this is a protected route' });
// // });

// //make our app ready for deployment
// if (ENV.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../frontend/dist')));
//   app.get('/{*any}', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
//   });
// }

// const startServer = async () => {
//   try {
//     await connectDB();
//     app.listen(ENV.PORT, () =>
//       console.log('Server is running on port:', ENV.PORT),
//     );
//   } catch (error) {
//     console.error('😭 Error starting the server', error);
//   }
// };

// startServer();
