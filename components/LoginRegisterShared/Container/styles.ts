import Logo from '@/components/Logo/Logo'
import { Row } from 'antd'
import styled from 'styled-components'

export const Container = styled(Row)<{
  readonly $xs?: boolean
}>`
  height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(to top, gray, #2a5f53);
  padding: ${(props) => (props.$xs ? '0 16px' : '0')};
  position: relative;
`

export const StyledLogo = styled(Logo)`
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
`
