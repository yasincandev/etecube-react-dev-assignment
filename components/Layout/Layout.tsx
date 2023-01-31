import { Layout as AntdLayout } from 'antd'
import Head from 'next/head'
import Navbar from '../Navbar/Navbar'
import { Container, Content } from './styles'

type LayoutProps = {
  title: string
  children: React.ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <Container>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      <AntdLayout>
        <Content>{children}</Content>
      </AntdLayout>
    </Container>
  )
}

export default Layout
