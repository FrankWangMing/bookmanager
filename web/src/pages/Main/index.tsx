import { observer } from 'mobx-react-lite'
import Navbar from '../../components/Navbar'
import { useEffect } from 'react'
import { viewmodel } from '../../model'
import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from 'components/Footer'
import { router } from 'router/router'
import React, { useState } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  InboxOutlined,
  BookOutlined,
  UserOutlined,
  DashboardOutlined,
  LoginOutlined
} from '@ant-design/icons'
import { Layout, Menu, Button, theme } from 'antd'

const { Header, Sider, Content } = Layout

export const Main = observer(() => {
  useEffect(() => {
    console.log(viewmodel.userModel.userInfo)
  }, [])
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()
  let location = useLocation()
  const [current, setCurrent] = useState(location.pathname)
  return (
    <Layout style={{ height: '100vh' }}>
      <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
        <div className="flex justify-start items-center">
          <h3 className="px-7">图书管理系统</h3>
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          onSelect={(r) => {
            if (r.key == '/login') {
              viewmodel.userModel.logout()
            }
            router.navigate(`${r.key}`)
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
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
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
