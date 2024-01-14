import { Button, Checkbox, Form, FormInstance, Input, Modal } from 'antd'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { modelStatusType } from '../Users'

const onFinish = (values: any) => {
  console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

type FieldType = {
  name?: string
  code?: string
}

export default observer(
  ({
    form,
    isModalOpen,
    handleOk,
    handleCancel,
    status
  }: {
    form: FormInstance
    isModalOpen: boolean
    handleOk: () => void
    handleCancel: () => void
    status: modelStatusType
  }) => {
    return (
      <Modal
        title={status == 'create' ? '新增供应商信息' : '修改供应商信息'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={'确认'}
        cancelText={'取消'}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="供应商姓名"
            name="name"
            rules={[{ required: true, message: '请输入供应商姓名!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            hidden={status == 'edit' ? true : false}
            label="供应商代码"
            name="code"
            rules={[{ required: true, message: '请输入供应商代码!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    )
  }
)
