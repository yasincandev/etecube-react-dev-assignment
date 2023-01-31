/* eslint-disable no-unused-vars */
import { MongoClient } from 'mongodb'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URL: string
      NODE_ENV: 'development' | 'production'
    }
  }
  var _mongoClientPromise: Promise<MongoClient>
  var mongoose: any
}

export {}
