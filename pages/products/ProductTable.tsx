import { Button, Card, Form, Modal, Table } from 'antd'
import Head from 'next/head'
import AddForm from './AddForm'
import EditForm from './EditForm'
import React, { FC, useState } from 'react'
import axios from 'axios'
import { getProductColumns } from '@/helpers/columns'
import { FormValues, Product, Products } from '@/types/product'
import { Companies } from '@/types/company'

interface ProductsProps {
  products: Products
  companies: Companies
}

const ProductTable: FC<ProductsProps> = ({
  products: productsData,
  companies,
}) => {
  const [loading, setLoading] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [products, setProducts] = useState<Products>(productsData)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const [form] = Form.useForm()

  const onFinish = async (values: FormValues) => {
    setLoading(true)
    const { data } = await axios.post('/api/product', values)
    setProducts((prev) => [...prev, data.data])
    setIsModalVisible(false)
    form.resetFields()
  }

  const onFinishEdit = async (id: string, values: FormValues) => {
    const { data } = await axios.put(`/api/product/${id}`, values)
    if (data) {
      setProducts((prev) => prev?.map((p) => (p._id === id ? data.data : p)))
    } else {
      console.log('Error')
    }
    setIsEditModalVisible(false)
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  const showEditModal = (product: Product) => {
    setSelectedProduct(product)
    setIsEditModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  const handleEditCancel = () => {
    setIsEditModalVisible(false)
    form.resetFields()
  }

  const singleDelete = async (id: string) => {
    setLoading(true)
    try {
      const { data } = await axios.delete(`/api/product/${id}`)
      setProducts((prev) => prev.filter((p) => p._id !== id))
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  const columns = getProductColumns({
    onConfirmDelete: singleDelete,
    onShowEditModal: showEditModal,
  })

  return (
    <div style={{ padding: 24 }}>
      <Head>
        <title>Products</title>
      </Head>
      <Button
        type="primary"
        onClick={showModal}
        style={{ marginBottom: 16, maxWidth: 200 }}
      >
        Add Product
      </Button>
      <Card>
        <Table
          columns={columns}
          dataSource={products?.map((p) => ({
            ...p,
            key: p?._id || '',
            company: companies?.find((c) => c._id === p.company)?.name,
          }))}
          pagination={{ pageSize: 5, position: ['bottomCenter'] }}
        />
      </Card>
      <Modal
        title="Add Product"
        open={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <AddForm
          onFinish={onFinish}
          companies={companies}
          form={form}
        />
      </Modal>
      <Modal
        title="Edit Product"
        open={isEditModalVisible}
        footer={null}
        onCancel={handleEditCancel}
      >
        <EditForm
          onFinish={(values) => onFinishEdit(selectedProduct!._id, values)}
          companies={companies}
          form={form}
          product={selectedProduct}
        />
      </Modal>
    </div>
  )
}

export default ProductTable
