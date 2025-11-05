import mongoose from 'mongoose';

// Global cache
let cached = global.mongoose || { conn: null, promise: null };
global.mongoose = cached;

export const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGODB_URI, {
        dbName: 'MedTrack_DB',
        bufferCommands: false,
        maxPoolSize: 5,
        minPoolSize: 1,
        serverSelectionTimeoutMS: 30000,
      })
      .then((m) => {
        console.log('MongoDB Connected');
        return m;
      })
      .catch((err) => {
        console.error('MongoDB Connection Error:', err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};
