import { GetServerSideProps, NextPage } from 'next'
import { Companies as ICompanies } from '@/types/company'
import { PrivateRoute, Table } from '@/components'
import dbConnect from '@/lib/dbConnect'
import Company from '@/models/Company'

type CompaniesProps = {
  companies: ICompanies
}

const Companies: NextPage<CompaniesProps> = ({ companies }) => {
  return (
    <PrivateRoute>
      <Table companies={companies} />
    </PrivateRoute>
  )
}

export default Companies

export const getServerSideProps: GetServerSideProps = async () => {
  dbConnect()
  const companies = await Company.find({})
  return {
    props: {
      companies: JSON.parse(JSON.stringify(companies)),
    },
  }
}
