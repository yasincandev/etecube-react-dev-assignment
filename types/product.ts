export interface Product {
  _id: string
  name: string
  category: string
  amount: number
  amountUnit: string
  company?: string
}

export type Products = Product[]

export type FormValues = {
  name: string
  category: string
  amount: number
  amountUnit: string
  company?: string
}
