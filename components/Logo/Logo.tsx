import { StyledLogo } from './styles'

const Logo = ({ className }: { className?: string }) => {
  return (
    <StyledLogo
      alt="Etecube Logo"
      src="/etecube_logo.png"
      className={className}
    />
  )
}

export default Logo
