import NextAuth from 'next-auth'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import clientPromise from '@/lib/mongodb'
import dbConnect from '@/lib/dbConnect'
import { compare } from 'bcryptjs'
import User from '@/models/User'

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials) return null
        const { username, password } = credentials

        await dbConnect()
        const user = await User.findOne({ username })

        if (!user) {
          throw new Error('No user found')
        }

        const isValid = await compare(password, user.password)

        if (!isValid) {
          throw new Error('Invalid password')
        }

        return {
          id: user.id,
          name: user.username,
        }
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
})

/*
https://github.com/Am4teur/nextauth-yt/blob/030ff3a4058392fe09dc60eabf0f968ea5543dee/model/User.ts
*/
