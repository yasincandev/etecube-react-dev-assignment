import { Company } from '@/types/company'
import { ColumnsType } from 'antd/es/table'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Popconfirm } from 'antd'
import { Product } from '@/types/product'

export const getCompanyColumns = ({
  onShowEditModal,
  onConfirmDelete,
}: {
  onShowEditModal: (company: Company) => void
  onConfirmDelete: (_id: string) => void
}): ColumnsType<Company> => [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name',
    render: (text) => <p>{text}</p>,
  },
  {
    key: 'legalNumber',
    title: 'Legal Number',
    dataIndex: 'legalNumber',
    responsive: ['sm'],
  },
  {
    key: 'incorporationCountry',
    title: 'Incorporation Country',
    dataIndex: 'incorporationCountry',
    responsive: ['sm'],
  },
  {
    key: 'website',
    title: 'Website',
    dataIndex: 'website',
    responsive: ['sm'],
  },
  {
    key: 'actions',
    title: 'Actions',
    dataIndex: 'actions',
    responsive: ['sm'],
    render(_value, record) {
      return (
        <>
          <Button
            type="ghost"
            onClick={() => onShowEditModal(record)}
          >
            <EditOutlined />
          </Button>

          <Popconfirm
            title="Delete the task"
            description="Are you sure you want to delete this company?"
            onConfirm={() => onConfirmDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="ghost">
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </>
      )
    },
  },
]

export const getProductColumns = ({
  onShowEditModal,
  onConfirmDelete,
}: {
  onShowEditModal: (product: Product) => void
  onConfirmDelete: (_id: string) => void
}): ColumnsType<Product> => [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <p>{text}</p>,
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    responsive: ['md'],
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    responsive: ['md'],
  },
  {
    title: 'Amount Unit',
    dataIndex: 'amountUnit',
    key: 'amountUnit',
    responsive: ['md'],
  },
  {
    title: 'Company',
    dataIndex: 'company',
    key: 'company',
    responsive: ['md'],
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions',
    responsive: ['md'],
    render(_value, record) {
      return (
        <>
          <Button
            type="ghost"
            onClick={() => onShowEditModal(record)}
          >
            <EditOutlined />
          </Button>

          <Popconfirm
            title="Delete the task"
            description="Are you sure you want to delete this company?"
            onConfirm={() => onConfirmDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="ghost">
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </>
      )
    },
  },
]
