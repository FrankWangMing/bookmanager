import { LockOutlined, UserOutlined, LoadingOutlined } from '@ant-design/icons'
import {
  LoginFormPage,
  ProConfigProvider,
  ProFormCheckbox,
  ProFormText
} from '@ant-design/pro-components'
import { Button, Form, Spin, theme } from 'antd'
import { ceil, random } from 'lodash'
import { observer } from 'mobx-react-lite'
import { viewmodel } from 'model'
import { useState } from 'react'
import { router } from 'router/router'

const Page = () => {
  const { token } = theme.useToken()
  const [form] = Form.useForm()
  const onSubmit = () => {
    const loginData = form.getFieldsValue()
    setSpinState(true)
    viewmodel.userModel
      .login({
        email: loginData.email,
        password: loginData.password
      })
      .then((r) => {
        setTimeout(() => {
          if (r) {
            setSpinState(false)
            viewmodel.userModel.fetchUserInfo()

            router.navigate('/dashboard')
          }
        }, 3000)
      })
  }
  const [spinState, setSpinState] = useState<boolean>(false)
  return (
    <div
      style={{
        backgroundColor: 'white',
        height: '100vh'
      }}
    >
      <LoginFormPage
        form={form}
        backgroundVideoUrl={`public/bg${ceil(random(10, 20, false)) % 2}.mp4 `}
        // backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
        title="图书管理系统"
        containerStyle={{
          backgroundColor: 'rgba(0, 0, 0,0.65)',
          backdropFilter: 'blur(4px)'
        }}
        subTitle="恭喜发财"
        // activityConfig={{
        //   style: {
        //     boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
        //     color: token.colorTextHeading,
        //     borderRadius: 8,
        //     backgroundColor: 'rgba(255,255,255,0.25)',
        //     backdropFilter: 'blur(4px)'
        //   },
        //   title: '活动标题，可配置图片',
        //   subTitle: '活动介绍说明文字',
        //   action: (
        //     <Button
        //       size="large"
        //       style={{
        //         borderRadius: 20,
        //         background: token.colorBgElevated,
        //         color: token.colorPrimary,
        //         width: 120
        //       }}
        //     >
        //       去看看
        //     </Button>
        //   )
        // }}
        submitter={{ onSubmit }}
        isKeyPressSubmit
      >
        <Spin
          size="large"
          indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
          spinning={spinState}
          className="text-white"
          tip={'登陆中'}
        >
          <>
            <ProFormText
              name="email"
              fieldProps={{
                size: 'large',
                prefix: (
                  <UserOutlined
                    style={{
                      color: token.colorText
                    }}
                    className={'prefixIcon'}
                  />
                )
              }}
              placeholder={'用户邮箱'}
              rules={[
                {
                  required: true,
                  message: '请输入用户邮箱!'
                }
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: (
                  <LockOutlined
                    style={{
                      color: token.colorText
                    }}
                    className={'prefixIcon'}
                  />
                )
              }}
              placeholder={'用户密码'}
              rules={[
                {
                  required: true,
                  message: '请输入用户密码！'
                }
              ]}
            />
          </>
          <div
            style={{
              marginBlockEnd: 24
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <a
              style={{
                float: 'right'
              }}
            >
              忘记密码
            </a>
          </div>
        </Spin>
      </LoginFormPage>
    </div>
  )
}

export const Login = observer(() => {
  return (
    <ProConfigProvider dark>
      <Page />
    </ProConfigProvider>
  )
})
