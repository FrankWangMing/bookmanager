import React, { useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input } from 'antd'
import { assign } from 'lodash'
import { viewmodel } from 'model'
import { router } from 'router/router'

const App: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values)
  }
  const [loginData, setLoginData] = useState({
    email: '928783975@qq.com',
    password: 'secret42'
  })
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
        initialValue={loginData.email}
      >
        <Input
          onChange={(r) => {
            setLoginData(assign(loginData, { email: r.target.value }))
          }}
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
        initialValue={loginData.password}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          onChange={(r) => {
            setLoginData(assign(loginData, { password: r.target.value }))
          }}
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button
          onClick={() => {
            console.log(loginData)
            viewmodel.userModel
              .login({
                email: loginData.email,
                password: loginData.password
              })
              .then((r) => {
                console.log(r)
                if (r) {
                  router.navigate('/dashboard')
                  // history.replace('/')
                }
              })
          }}
          type="primary"
          htmlType="submit"
          className="login-form-button"
        >
          Log in
        </Button>
        Or <a href="">register now!</a>
      </Form.Item>
    </Form>
  )
}

export default App
