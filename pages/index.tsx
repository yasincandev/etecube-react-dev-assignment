import { GetServerSideProps, NextPage } from 'next'
import { Card, Col, Divider, Row } from 'antd'
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
        backgroundColor: companies.map(() => {
          const color = Math.floor(0x1000000 * Math.random()).toString(16)
          return '#' + ('000000' + color).slice(-6)
        }),

        borderWidth: 1,
      },
    ],
  }

  return (
    <PrivateRoute>
      <Container>
        <Row gutter={[16, 16]}>
          <Col
            sm={24}
            md={12}
          >
            <Card
              title="Companies"
              bordered={false}
            >
              There are {companies.length} companies in the system
            </Card>
          </Col>
          <Col
            sm={24}
            md={12}
          >
            <Card
              title="Products"
              bordered={false}
              style={{ width: '100%' }}
            >
              There are {products.length} products in the system
            </Card>
          </Col>
          <Divider />
          <Col
            sm={24}
            md={12}
          >
            {/*   <Card
              title="Companies Have Most Products Pie Chart"
              bordered={false}
            > */}
            <StyledPie
              data={data}
              options={{
                responsive: true,
              }}
              style={{
                backgroundColor: 'white',
                padding: '10px',
                borderRadius: '10px',
              }}
            />
            {/*    </Card> */}
          </Col>
          <Col
            sm={24}
            md={12}
          >
            <Card
              title="Last Three Companies"
              bordered={false}
              style={{ width: '100%', overflowX: 'auto' }}
            >
              <CompanyTable companies={lastThreeCompanies} />
            </Card>
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

const Container = styled.div`
  padding: 20px;
  overflow-y: auto;
  -webkit-animation: Container 0.5s cubic-bezier(0.47, 0, 0.745, 0.715) both;
  animation: Container 0.5s cubic-bezier(0.47, 0, 0.745, 0.715) both;

  @media (max-width: 768px) {
    padding: 10px;
  }

  @-webkit-keyframes Container {
    0% {
      -webkit-transform: translateX(1000px) scaleX(2.5) scaleY(0.2);
      transform: translateX(1000px) scaleX(2.5) scaleY(0.2);
      -webkit-transform-origin: 0% 50%;
      transform-origin: 0% 50%;
      -webkit-filter: blur(40px);
      filter: blur(40px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateX(0) scaleY(1) scaleX(1);
      transform: translateX(0) scaleY(1) scaleX(1);
      -webkit-transform-origin: 50% 50%;
      transform-origin: 50% 50%;
      -webkit-filter: blur(0);
      filter: blur(0);
      opacity: 1;
    }
  }
  @keyframes Container {
    0% {
      -webkit-transform: translateX(1000px) scaleX(2.5) scaleY(0.2);
      transform: translateX(1000px) scaleX(2.5) scaleY(0.2);
      -webkit-transform-origin: 0% 50%;
      transform-origin: 0% 50%;
      -webkit-filter: blur(40px);
      filter: blur(40px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateX(0) scaleY(1) scaleX(1);
      transform: translateX(0) scaleY(1) scaleX(1);
      -webkit-transform-origin: 50% 50%;
      transform-origin: 50% 50%;
      -webkit-filter: blur(0);
      filter: blur(0);
      opacity: 1;
    }
  }
`

const StyledPie = styled(Pie)`
  background-color: white;
  padding: 10px;
  border-radius: 10px;

  @media (max-width: 768px) {
    padding: 5px;
  }
`
