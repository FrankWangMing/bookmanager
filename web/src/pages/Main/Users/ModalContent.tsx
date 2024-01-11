import { Button, Checkbox, Form, FormInstance, Input } from 'antd'
import { observer } from 'mobx-react-lite'
import { modelStatusType } from '.'

type FieldType = {
  username: string
  email?: string
  password?: string
}

export default observer(
  ({
    form,
    onFinish,
    onFinishFailed,
    modelStatus
  }: {
    onFinish: (value: any) => void
    onFinishFailed: (value: any) => void
    form: FormInstance
    modelStatus: modelStatusType
  }) => {
    return (
      <Form
        form={form}
        preserve={false}
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="员工姓名"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="登录邮箱"
          name="email"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="密码"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    )
  }
)
