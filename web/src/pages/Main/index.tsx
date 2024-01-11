import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { viewmodel } from '../../model'
import { Outlet, useLocation } from 'react-router-dom'
import { router } from 'router/router'
import React, { useState } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  InboxOutlined,
  BookOutlined,
  UserOutlined,
  DashboardOutlined,
  LoginOutlined,
  EditOutlined
} from '@ant-design/icons'
import {
  Layout,
  Menu,
  Button,
  theme,
  message,
  Modal,
  Avatar,
  Space,
  Flex,
  Dropdown,
  MenuProps,
  Tag
} from 'antd'
const { Header, Sider, Content } = Layout

export const Main = observer(() => {
  const [modal, contextHolder] = Modal.useModal()

  useEffect(() => {
    console.log(viewmodel.userModel.userInfo)
  }, [])
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()
  let location = useLocation()
  const [current, setCurrent] = useState(location.pathname)

  const [selectedKeys, setSelectedKeys] = useState(location.pathname)
  useEffect(() => {
    setSelectedKeys(location.pathname)
  }, [location.pathname])

  const items: MenuProps['items'] = [
    {
      key: '3',
      label: '修改密码',
      icon: <EditOutlined />,
      onClick: (r) => {
        if (r.key == '3') {
          console.log('DD')
        }
      }
    },
    {
      key: '4',
      danger: true,
      label: '退出登录',
      icon: <LoginOutlined />,
      onClick: (r) => {
        console.log(r)
        if (r.key == '4') {
          viewmodel.userModel.logout()
          router.navigate('/login')
        }
      }
    }
  ]

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
        <div className="flex justify-start items-center">
          <h3 className="px-7">图书管理系统</h3>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedKeys]}
          onSelect={(r) => {
            if (r.key == '/login') {
              modal
                .confirm({
                  title: '确认退出',
                  okText: '确认',
                  cancelText: '取消'
                })
                .then(
                  (t) => {
                    console.log(t)
                    if (t == true) {
                      viewmodel.userModel.logout()
                      router.navigate(`${r.key}`)
                    } else {
                      setSelectedKeys(location.pathname)
                    }
                  },
                  () => {}
                )
            } else {
              router.navigate(`${r.key}`)
            }
          }}
          items={[
            {
              label: '面板',
              key: '/dashboard',
              icon: <DashboardOutlined />
            },
            {
              label: '供应商管理',
              key: '/supplier',
              icon: <InboxOutlined />
            },
            {
              label: '图书管理',
              key: '/books',
              icon: <BookOutlined />
            },
            {
              label: '用户管理',
              key: '/users',
              icon: <UserOutlined />
            },
            {
              label: '退出登录',
              key: '/login',
              icon: <LoginOutlined />
            }
          ].filter((i) => {
            if (viewmodel.userModel.userInfo?.role == 'ADMIN') {
              return (
                [
                  '/dashboard',
                  '/supplier',
                  '/books',
                  '/users',
                  '/login'
                ].includes(i.key) && i
              )
            } else {
              return ['/dashboard', '/books', '/login'].includes(i.key) && i
            }
          })}
        />
        {contextHolder}
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            color: '#fff',
            lineHeight: '64px',
            background: colorBgContainer
          }}
        >
          <Flex align="center" justify="space-between">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64
              }}
            />
            <Dropdown menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  您好,{viewmodel.userModel.userInfo?.username}
                  {
                    <Tag>
                      {viewmodel.userModel.userInfo?.role == 'ADMIN'
                        ? '超级管理员'
                        : '普通'}
                    </Tag>
                  }
                  <Avatar
                    shape="square"
                    className="mr-8"
                    size={32}
                    icon={<UserOutlined />}
                  />
                </Space>
              </a>
            </Dropdown>
          </Flex>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
})
