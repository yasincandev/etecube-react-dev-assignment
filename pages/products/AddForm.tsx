import { Form, Input, Button, Select, InputNumber, FormInstance } from 'antd'
import { Companies } from '@/types/company'
import { FC } from 'react'
import { FormValues } from '@/types/product'

type FormProps = {
  onFinish: (values: FormValues) => void
  form: FormInstance
  companies: Companies
}

const AddForm: FC<FormProps> = ({ onFinish, companies, form }) => {
  const categories: string[] = [
    'Electronics',
    'Tools & Home Improvement',
    'Pet Supplies',
    'Office Products',
    'Sports & Outdoors',
    'Toys & Games',
    'Home & Kitchen',
  ]
  return (
    <Form
      form={form}
      name="add"
      initialValues={{
        name: '',
        category: '',
        amount: 0,
        amountUnit: '',
        company: '',
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
        label="Product Name"
        name="name"
        rules={[{ required: true, message: 'Please input your product name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Product Category"
        name="category"
        rules={[
          {
            required: true,
            message: 'Please input your  product category!',
          },
        ]}
      >
        <Select>
          {categories &&
            categories?.map((category) => (
              <Select.Option
                key={category}
                value={category}
              >
                {category}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Product Amount "
        name="amount"
        rules={[
          {
            required: true,
            message: 'Please input your product amount!',
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="Amount Unit"
        name="amountUnit"
        rules={[{ required: true, message: 'Please input your amount unit!' }]}
      >
        <Input />
      </Form.Item>
      {companies?.length > 0 && (
        <Form.Item
          label="Related Company"
          name="company"
          rules={[
            {
              message: 'Please input your related company!',
            },
          ]}
        >
          <Select>
            {companies &&
              companies?.map((company) => (
                <Select.Option
                  key={company._id}
                  value={company.name}
                >
                  {company.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
      )}
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
