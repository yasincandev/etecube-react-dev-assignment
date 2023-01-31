import dbConnect from '@/lib/dbConnect'
import Company from '@/models/Company'
import Product from '@/models/Product'
import type { NextApiRequest, NextApiResponse } from 'next'

dbConnect()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { _id } = req.query
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const company = await Company.findById(_id)

        if (!company) {
          return res.status(400).json({ success: false })
        }

        res.status(200).json({ success: true, data: company })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'PUT':
      try {
        const company = await Company.findByIdAndUpdate(_id, req.body, {
          new: true,
          runValidators: true,
        })

        if (!company) {
          return res.status(400).json({ success: false })
        }

        res.status(200).json({ success: true, data: company })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'DELETE':
      try {
        const company = await Company.findByIdAndDelete(_id)

        if (!company) {
          return res.status(400).json({ success: false })
        }

        await Product.deleteMany({ company: company._id })

        res.status(200).json({ success: true, data: company })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
