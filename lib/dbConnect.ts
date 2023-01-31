import mongoose from 'mongoose'

if (!process.env.MONGODB_URL) {
  throw new Error('MONGODB_URL must be defined')
}

const MONGODB_URL = process.env.MONGODB_URL

if (!MONGODB_URL) {
  throw new Error('MONGODB_URL must be defined')
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}
async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
    }

    cached.promise = mongoose.connect(MONGODB_URL, opts).then((mongoose) => {
      return mongoose
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect
