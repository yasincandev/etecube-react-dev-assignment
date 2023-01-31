import { Layout } from 'antd'
import styled from 'styled-components'

export const Container = styled(Layout)`
  height: 100vh;
`

export const Content = styled(Layout.Content)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to top, gray, #2a5f53);
`
