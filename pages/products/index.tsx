import { Products as IProducts } from '@/types/product'
import { GetServerSideProps, NextPage } from 'next'
import ProductTable from './ProductTable'
import { Companies } from '@/types/company'
import dbConnect from '@/lib/dbConnect'
import Company from '@/models/Company'
import Product from '@/models/Product'
import { PrivateRoute } from '@/components'

type ProductsProps = {
  products: IProducts
  companies: Companies
}

const Products: NextPage<ProductsProps> = ({ products, companies }) => {
  console.log(companies)
  return (
    <PrivateRoute>
      <ProductTable
        products={products}
        companies={companies}
      />
    </PrivateRoute>
  )
}

export default Products

export const getServerSideProps: GetServerSideProps = async () => {
  await dbConnect()

  const companies = await Company.find({})
  const products = await Product.find({})

  return {
    props: {
      companies: JSON.parse(JSON.stringify(companies)),
      products: JSON.parse(JSON.stringify(products)),
    },
  }
}
