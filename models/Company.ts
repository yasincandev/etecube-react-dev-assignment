import * as mongoose from 'mongoose'

export interface ICompany extends mongoose.Document {
  name: string
  legalNumber: number
  incorporationCountry: string
  website: string
}

const CompanySchema: mongoose.Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    legalNumber: {
      type: Number,
      required: true,
    },
    incorporationCountry: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const Company: mongoose.Model<ICompany> =
  mongoose.models?.Company || mongoose.model('Company', CompanySchema)

export default Company
