import * as mongoose from 'mongoose'

export interface IProduct extends mongoose.Document {
  name: string
  category: string
  amount: number
  amountUnit: string
  company: mongoose.Schema.Types.ObjectId
}

const ProductSchema: mongoose.Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    amountUnit: {
      type: String,
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      $ref: 'companies',
      $id: true,
    },
  },
  { timestamps: true }
)

const Product: mongoose.Model<IProduct> =
  mongoose.models?.Product || mongoose.model('Product', ProductSchema)

export default Product
