import dbConnect from '@/lib/dbConnect'
import Company from '@/models/Company'
import type { NextApiRequest, NextApiResponse } from 'next'

dbConnect()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req
  switch (method) {
    case 'GET':
      try {
        const client = await Company.find(
          {}
        ) /* find all the data in our database */
        res.status(200).json({ success: true, data: client })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const company = await Company.create(
          req.body
        ) /* create a new model in the database */
        res.status(201).json({ success: true, data: company })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
