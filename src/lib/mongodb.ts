import mongoose from 'mongoose';
import '@/models/ClinicalRecord';
import '@/models/User';

declare global {
  var mongooseCache:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

const cached = globalThis.mongooseCache || { conn: null, promise: null };
globalThis.mongooseCache = cached;

export const connectDB = async (): Promise<typeof mongoose> => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const uri = process.env.MONGODB_URI as string;

    cached.promise = mongoose
      .connect(uri, {
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
