import { Col, Grid, Row } from 'antd'
import { Container, StyledLogo } from './styles'

const LoginRegisterContainer: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const { xs } = Grid.useBreakpoint()
  return (
    <Container $xs={xs}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <StyledLogo />
      <Col span={24}>
        <Row justify="center">
          <Col
            span={24}
            sm={16}
            md={12}
            lg={10}
            xl={9}
            xxl={7}
          >
            {children}
          </Col>
        </Row>
      </Col>
    </Container>
  )
}

export default LoginRegisterContainer
