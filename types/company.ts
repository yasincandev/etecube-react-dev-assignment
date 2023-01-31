export interface Company {
  _id: string
  name: string
  legalNumber: number
  incorporationCountry: string
  website: string
  createdAt: string
}

export type Companies = Company[]

export type FormValues = {
  name: string
  legalNumber: number
  incorporationCountry: string
  website: string
}
