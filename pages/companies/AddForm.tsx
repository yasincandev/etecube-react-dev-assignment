import { Form, Input, Button, FormInstance } from 'antd'
import { FormValues } from '@/types/company'
import { FC } from 'react'

type FormProps = {
  onFinish: (values: FormValues) => void
  form: FormInstance
}

const AddForm: FC<FormProps> = ({ onFinish, form }) => {
  return (
    <Form
      form={form}
      name="add"
      initialValues={{
        name: '',
        legalNumber: 0,
        incorporationCountry: '',
        website: '',
      }}
      onFinish={onFinish}
      autoComplete="off"
      labelCol={{ flex: '220px' }}
      labelAlign="left"
      labelWrap
      wrapperCol={{ flex: 1 }}
      colon={false}
    >
      <Form.Item
        label="Company Name"
        name="name"
        rules={[{ required: true, message: 'Please input your company name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Company Legal Number"
        name="legalNumber"
        rules={[
          {
            required: true,
            message: 'Please input your company legal number!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Country of Incorporation"
        name="incorporationCountry"
        rules={[
          {
            required: true,
            message: 'Please input your country of incorporation!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Company Website"
        name="website"
        rules={[
          { required: true, message: 'Please input your company website!' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item style={{ textAlign: 'right' }}>
        <Button
          type="primary"
          htmlType="submit"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default AddForm
