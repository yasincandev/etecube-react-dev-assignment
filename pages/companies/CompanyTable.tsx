import { Alert, Button, Card, Form, Modal, Table } from 'antd'
import Head from 'next/head'
import AddForm from './AddForm'
import { FormValues, Companies, Company } from '@/types/company'
import React, { FC, useState } from 'react'
import axios from 'axios'
import { getCompanyColumns } from '@/helpers/columns'
import EditForm from './EditForm'

interface CompaniesProps {
  companies: Companies
}

const CompanyTable: FC<CompaniesProps> = ({ companies: companiesData }) => {
  const [loading, setLoading] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [companies, setCompanies] = useState<Companies>(companiesData)
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)

  const [form] = Form.useForm()

  const onFinish = async (values: FormValues) => {
    setLoading(true)
    try {
      const { data } = await axios.post('/api/company', values)
      setCompanies((prev) => [...prev, data.data])
    } catch (error) {
      console.error(error)
    }

    setLoading(false)
    form.resetFields()
    setIsModalVisible(false)
  }

  const onEditFinish = async (_id: string, values: FormValues) => {
    const { data } = await axios.put(`/api/company/${_id}`, values)
    if (data) {
      setCompanies((prev) => prev?.map((p) => (p._id === _id ? data.data : p)))
    } else {
      return (
        <Alert
          message="Error"
          description="Something went wrong"
          type="error"
          showIcon
        />
      )
    }
    setIsEditModalVisible(false)
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  const showEditModal = (company: Company) => {
    setSelectedCompany(company)
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
      const { data } = await axios.delete(`/api/company/${id}`)
      if (!data) {
        return (
          <Alert
            message="Error"
            description="Something went wrong"
            type="error"
            showIcon
          />
        )
      }
      setCompanies((prev) => prev.filter((p) => p._id !== id))
    } catch (error: any) {
      return (
        <Alert
          message={error.message}
          description="Something went wrong"
          type="error"
          showIcon
        />
      )
    }
    setLoading(false)
  }

  const columns = getCompanyColumns({
    onShowEditModal: showEditModal,
    onConfirmDelete: singleDelete,
  })

  return (
    <>
      <Head>
        <title>Companies</title>
      </Head>
      <Button
        type="primary"
        onClick={showModal}
        style={{ marginBottom: 16, maxWidth: 200 }}
      >
        Add Company
      </Button>
      <Card>
        <Table
          columns={columns}
          dataSource={companies?.map((c) => ({ ...c, key: c._id }))}
          pagination={{ pageSize: 5, position: ['bottomCenter'] }}
          loading={loading}
        />
      </Card>
      <Modal
        title="Add Company"
        open={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <AddForm
          onFinish={onFinish}
          form={form}
        />
      </Modal>
      <Modal
        title="Edit Company"
        open={isEditModalVisible}
        footer={null}
        onCancel={handleEditCancel}
      >
        <EditForm
          onFinish={(values) => onEditFinish(selectedCompany!._id, values)}
          company={selectedCompany}
          form={form}
        />
      </Modal>
    </>
  )
}

export default CompanyTable
