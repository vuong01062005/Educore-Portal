import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI as string;

let cached = (global as any).mongooseCache;
if (!cached) cached = (global as any).mongooseCache = { conn: null, promise: null };

export async function connectDB() {
  if (!uri) throw new Error('Thiếu MONGODB_URI');
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, { bufferCommands: false });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}