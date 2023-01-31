import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/lib/dbConnect'
import User from '@/models/User'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

interface ResponseData {
  error?: string
  message?: string
}

const schema = z.object({
  username: z.string().min(1),
  password: z.string().min(6),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(400).json({ error: 'Register only accepts POST methods' })
  }

  const { username, password } = req.body

  const validate = schema.safeParse({ username, password })
  if (!validate.success) {
    return res.status(400).json({ error: validate.error.message })
  }

  const cryptedPassword = await bcrypt.hash(password, 10)

  const newUser = new User({
    username,
    password: cryptedPassword,
  })

  try {
    await dbConnect()
    await newUser.save()
    return res.status(201).json({ message: 'User created successfully' })
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}
