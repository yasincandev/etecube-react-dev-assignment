import { GetServerSideProps, NextPage } from 'next'
import { Card, Col, Divider, List, Row, Typography } from 'antd'
import { Companies } from '@/types/company'
import { PrivateRoute } from '@/components'
import CompanyTable from './companies/CompanyTable'
import dbConnect from '@/lib/dbConnect'
import Company from '@/models/Company'
import Product from '@/models/Product'
import { Products } from '@/types/product'
import styled from 'styled-components'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { Container, StyledGrid, StyledPie, StyledTable } from '@/styles'

interface HomeProps {
  companies: Companies
  lastThreeCompanies: Companies
  products: Products
}
ChartJS.register(ArcElement, Tooltip, Legend)
export const Home: NextPage<HomeProps> = ({
  companies,
  lastThreeCompanies,
  products,
}) => {
  //create the connection between the company and the product
  const data = {
    labels: companies.map((company) => company.name),
    datasets: [
      {
        fill: false,
        label: '# of products',

        data: companies.map((company) => {
          const companyProducts = products.filter(
            (product) => product.company?.toString() === company._id.toString()
          )
          return companyProducts.length
        }),
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
        ],

        borderWidth: 1,
      },
    ],
  }

  const config = {
    type: 'pie',
    plugins: {
      subtitle: {
        display: true,
        text: 'Custom Chart Subtitle',
      },
      customCanvasBackgroundColor: {
        backgroundColor: 'white',
      },
      responsive: true,
      maintainAspectRatio: false,
      onResize: () => {
        console.log('resize')
      },
    },
  }

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

  //show products have company
  const products = await Product.find({})

  return {
    props: {
      companies: JSON.parse(JSON.stringify(companies)),
      lastThreeCompanies: JSON.parse(JSON.stringify(lastThreeCompanies)),
      products: JSON.parse(JSON.stringify(products)),
    },
  }
}
