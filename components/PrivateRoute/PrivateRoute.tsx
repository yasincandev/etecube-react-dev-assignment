import { Spin } from 'antd'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { SpinContainer } from './styles'

type PrivateRouteProps = {
  children: React.ReactNode
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { status } = useSession()
  const { push, pathname } = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      push(`/login?returnUrl=${pathname}`)
    }
  }, [pathname, push, status])

  if (status === 'loading') {
    return (
      <SpinContainer>
        <Spin size="large" />
      </SpinContainer>
    )
  }

  if (status === 'unauthenticated') return null

  return <>{children}</>
}

export default PrivateRoute
