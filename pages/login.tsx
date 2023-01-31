import Head from 'next/head'
import Container from '@/components/LoginRegisterShared/Container/Container'
import Form from '@/components/LoginRegisterShared/Form'
import { FormValues } from '@/components/LoginRegisterShared/types'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

const Login: React.FC = () => {
  const {
    push,
    query: { returnUrl },
  } = useRouter()
  const handleFinish = async (values: FormValues) => {
    const res = await signIn('credentials', {
      redirect: false,
      username: values.username,
      password: values.password,
      callbackUrl: '/',
    })
    if (!res) {
      // todo: set error state and show alert
      throw new Error('No response')
    }
    if (res.error) {
      // todo: set error state and show alert
      throw new Error(res.error)
    }
    if (res.ok) {
      push((returnUrl as string) ?? '/')
    }
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Container>
        <Form
          type="login"
          onFinish={handleFinish}
        />
      </Container>
    </>
  )
}

export default Login
