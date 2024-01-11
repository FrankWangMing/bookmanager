import { observer } from 'mobx-react-lite'
import { Items } from './items'
import { Current } from './Current'
import { Col, Form, Row } from 'antd'
import { useState } from 'react'
import ModalSupplierContent from './ModalSupplierContent'
import { modelStatusType } from '../Users'
import { viewmodel } from 'model'

export default observer(() => {
  const [form] = Form.useForm()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [status, setStatus] = useState<modelStatusType>('create')
  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
    const { code, name } = form.getFieldsValue(['code', 'name'])
    if (status == 'create') {
      viewmodel.supplierModel.createSupplier(code, name).then((r) => {
        console.log(r)
      })
    }
    if (status == 'edit') {
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  return (
    <div className="max-h-full">
      <Row gutter={16}>
        <Col span={8}>
          <Items showModal={showModal} setStatus={setStatus} form={form} />
        </Col>
        <Col span={16}>
          <Current />
        </Col>
      </Row>
      <ModalSupplierContent
        form={form}
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        status={status}
      />
    </div>
  )
})
//
