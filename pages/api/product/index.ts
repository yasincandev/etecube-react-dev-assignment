import type { NextApiRequest, NextApiResponse } from 'next'
import Product from '@/models/Product'
import Company from '@/models/Company'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req
  switch (method) {
    case 'GET':
      try {
        const products = await Product.find({})
        res.status(200).json({ success: true, data: products })
      } catch (error: any) {
        res.status(400).json({ success: false, error: error.message })
      }
      break
    case 'POST':
      try {
        const { name, category, amount, amountUnit, company } = req.body
        const existingCompany = await Company.findOne({ name: company })
        if (!existingCompany) {
          res.status(400).json({ success: false, error: 'Company not found' })
        }
        const product = await new Product({
          name,
          category,
          amount,
          amountUnit,
          company: existingCompany?._id,
        }).save()
        res.status(201).json({ success: true, data: product })
      } catch (error: any) {
        res.status(400).json({ success: false, error: error.message })
      }

      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
