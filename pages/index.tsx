import { GetServerSideProps, NextPage } from 'next'
import { Card, Col, Row, Typography } from 'antd'
import { Companies } from '@/types/company'
import { PrivateRoute } from '@/components'
import CompanyTable from './companies/CompanyTable'
import dbConnect from '@/lib/dbConnect'
import Company from '@/models/Company'
import Product from '@/models/Product'
import { Products } from '@/types/product'

import { Container } from '@/styles'

interface HomeProps {
  companies: Companies
  lastThreeCompanies: Companies
  products: Products
}

export const Home: NextPage<HomeProps> = ({
  companies,
  lastThreeCompanies,
  products,
}) => {
  const companiesWithProducts = companies.map((company) => {
    const companyProducts = products.filter(
      (product) => product.company?.toString() === company._id.toString()
    )
    return companyProducts.length
  })

  console.log(companiesWithProducts)

  return (
    <PrivateRoute>
      <Container>
        <Row
          gutter={[16, 16]}
          justify="center"
        >
          <Col
            sm={12}
            md={12}
            lg={8}
          >
            <Card
              title="Companies"
              bordered={false}
            >
              There are {companies.length} companies in the system
            </Card>
          </Col>
          <Col
            sm={12}
            md={12}
            lg={8}
          >
            <Card
              title="Products"
              bordered={false}
            >
              There are {products.length} products in the system
            </Card>
          </Col>
          <Col
            sm={12}
            md={12}
            lg={8}
          >
            <Card
              title="Companies and Products"
              bordered={false}
            >
              The Most Products are in{' '}
              {
                companies[
                  companiesWithProducts.indexOf(
                    Math.max(...companiesWithProducts)
                  )
                ].name
              }
            </Card>
          </Col>

          <Col span={24}>
            <Typography.Title
              level={3}
              style={{ textAlign: 'center' }}
            >
              Last Three Companies
            </Typography.Title>
            <CompanyTable companies={lastThreeCompanies} />
          </Col>
        </Row>
      </Container>
    </PrivateRoute>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  dbConnect()
  const companies = await Company.find({})
  const lastThreeCompanies = await Company.find({})
    .sort({ createdAt: -1 })
    .limit(3)

  const products = await Product.find({})

  return {
    props: {
      companies: JSON.parse(JSON.stringify(companies)),
      lastThreeCompanies: JSON.parse(JSON.stringify(lastThreeCompanies)),
      products: JSON.parse(JSON.stringify(products)),
    },
  }
}
