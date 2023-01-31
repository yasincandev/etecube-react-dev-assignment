import {
  Button,
  Form as AntdForm,
  Input,
  Typography,
  Row,
  Col,
  Grid,
} from 'antd'
import { FormValues } from './types'
import Link from 'next/link'

type FormProps = {
  type: 'login' | 'register'
  onFinish: (values: FormValues) => void
}

const Form: React.FC<FormProps> = ({ type, onFinish }) => {
  const isLogin = type === 'login'
  // using useBreakpoint because using breakpoint props doesn't work
  const { lg } = Grid.useBreakpoint()
  return (
    <AntdForm
      name={type}
      labelCol={{
        span: lg ? 8 : 24,
      }}
      wrapperCol={{
        span: lg ? 16 : 24,
      }}
      initialValues={{
        username: '',
        password: '',
        confirmPassword: '',
      }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <AntdForm.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </AntdForm.Item>
      <AntdForm.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password id="password" />
      </AntdForm.Item>
      {!isLogin && (
        <AntdForm.Item
          label="Confirm Password"
          name="password"
          rules={[{ required: true, message: 'Please confirm your password!' }]}
        >
          <Input.Password id="confirm_password" />
        </AntdForm.Item>
      )}
      <AntdForm.Item
        wrapperCol={{
          span: lg ? 16 : 24,
          offset: lg ? 8 : undefined,
        }}
      >
        <Button
          type="primary"
          htmlType="submit"
        >
          {isLogin ? 'Login' : 'Register'}
        </Button>
      </AntdForm.Item>
      <Row>
        <Col
          span={lg ? 16 : 24}
          offset={lg ? 8 : undefined}
        >
          {isLogin ? (
            <Typography.Text>
              Don&apos;t have an account? <Link href="/register">Register</Link>
            </Typography.Text>
          ) : (
            <Typography.Text>
              Already have an account? <Link href="/login">Login</Link>
            </Typography.Text>
          )}
        </Col>
      </Row>
    </AntdForm>
  )
}

export default Form
