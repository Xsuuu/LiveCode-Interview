import mongoose from 'mongoose';

import { ENV } from './env.js';

export const connectDB = async () => {
  try {
    try(! ENV.DB_URL) {
      throw new Error("DB_URL is not defined in environment variables");
    }
    const conn = await mongoose.connect(ENV.DB_URL, {
      family: 4,               // 强制 IPv4
      connectTimeoutMS: 10000, // 增加超时等待
    });
    console.log('🦄 Connected to MongoDB:', conn.connection.host)
  } catch (error) {
    console.error("💀 Error connecting to MongoDB:", error.message)
    // process.exit(1) //0 means success, 1 means failure
    throw error
  }
};
