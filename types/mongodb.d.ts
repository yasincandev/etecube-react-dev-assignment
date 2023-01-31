/* eslint-disable no-unused-vars */
import { MongoClient } from 'mongodb'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string
      NODE_ENV: 'development' | 'production'
    }
  }
  var _mongoClientPromise: Promise<MongoClient>
  var mongoose: any
}

export {}
