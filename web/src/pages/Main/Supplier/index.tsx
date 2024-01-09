import { observer } from 'mobx-react-lite'
import { Items } from './items'
import { Current } from './Current'
import { Col, Modal, Row } from 'antd'
import { useState } from 'react'
import ModalSupplierContent from './ModalSupplierContent'

export default observer(() => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  return (
    <div className="max-h-full">
      <Row gutter={16}>
        <Col span={8}>
          <Items showModal={showModal} />
        </Col>
        <Col span={16}>
          <Current showModal={showModal} />
        </Col>
      </Row>
      <Modal
        title="供应商信息"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <ModalSupplierContent />
      </Modal>
    </div>
  )
})
//
