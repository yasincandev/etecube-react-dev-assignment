import type { NextApiRequest, NextApiResponse } from 'next'
import Product from '@/models/Product'
import dbConnect from '@/lib/dbConnect'
import Company from '@/models/Company'

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
        const product = await Product.findById(_id)

        if (!product) {
          return res.status(400).json({ success: false })
        }

        res.status(200).json({ success: true, data: product })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'PUT':
      const { name, category, amount, amountUnit, company } = req.body
      const existingCompany = await Company.findOne({ name: company })
      if (!existingCompany) {
        res.status(400).json({ success: false, error: 'Company not found' })
      }
      const product = await Product.findByIdAndUpdate(
        _id,
        {
          name,
          category,
          amount,
          amountUnit,
          company: existingCompany?._id,
        },
        {
          new: true,
          runValidators: true,
        }
      )

      if (!product) {
        return res.status(400).json({ success: false })
      }

      res.status(200).json({ success: true, data: product })

      break

    case 'DELETE':
      try {
        const product = await Product.findByIdAndDelete(_id)

        if (!product) {
          return res.status(400).json({ success: false })
        }

        res.status(200).json({ success: true, data: product })
      } catch (error: any) {
        res.status(400).json({ success: false, error: error.message })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
