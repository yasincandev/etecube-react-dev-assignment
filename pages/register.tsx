import Head from 'next/head'
import axios from 'axios'
import Container from '@/components/LoginRegisterShared/Container/Container'
import Form from '@/components/LoginRegisterShared/Form'
import { FormValues } from '@/components/LoginRegisterShared/types'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

const Register: NextPage = () => {
  const { push } = useRouter()

  const handleFinish = async (values: FormValues) => {
    const { data } = await axios.post(
      '/api/register',
      {
        username: values.username,
        password: values.password,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )
    if (data.message === 'User created successfully') {
      push('/login')
    }
  }
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <Container>
        <Form
          type="register"
          onFinish={handleFinish}
        />
      </Container>
    </>
  )
}

export default Register
