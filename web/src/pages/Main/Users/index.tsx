import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { viewmodel } from '../../../model'
import { Space, Card, Button, Modal, Flex, Popconfirm, Tag } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import ModalContent from './ModalContent'
import { useForm } from 'antd/es/form/Form'
import { uniqueId } from 'lodash'
import { Users as UsersModel } from 'model/users'

export type modelStatusType = 'create' | 'edit'
export const Users = observer(() => {
  const [form] = useForm()
  const [modelStatus, setModelStatus] = useState<modelStatusType>('create')
  useEffect(() => {
    console.log(viewmodel.userModel.userInfo)
  }, [])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    console.log(form.submit())

    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const onFinish = (values: any) => {
    switch (modelStatus) {
      case 'create':
        viewmodel.userModel.createUserInfo(values).then((r) => {
          console.log(r)
          viewmodel.userModel.getUsers().then((r) => {
            console.log(viewmodel.userModel.allUsers.length)
          })
        })
        break
      case 'edit':
        viewmodel.userModel.createUserInfo(values).then((r) => {
          console.log(r)
          viewmodel.userModel.getUsers().then((r) => {
            console.log(viewmodel.userModel.allUsers.length)
          })
        })
        break
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  const DeleteUser = async (i: any) => {
    console.log('Failed:', i)
    const res = await viewmodel.userModel.deleteUserById(i.email)
    viewmodel.userModel.getUsers()
    console.log(res)
  }
  const addUser = () => {
    setModelStatus('create')
    form.setFieldsValue({
      email: '',
      username: '',
      password: ''
    })
    showModal()
  }
  const editUser = (user: UsersModel['userInfo']) => {
    setModelStatus('edit')
    console.log(user)
    console.log(user?.email)
    form.setFieldsValue({
      email: user?.email,
      username: user?.username,
      password: ''
    })
    showModal()
  }
  useEffect(() => {
    viewmodel.userModel.getUsers()
  }, [])
  return (
    <>
      <Flex gap="middle" vertical justify={'flex-start'}>
        <div>
          <Button onClick={addUser} type="primary">
            新增员工
          </Button>
        </div>
        <Flex wrap="wrap" gap="small">
          {viewmodel.userModel.allUsers.map((i) => {
            return (
              <Card
                key={uniqueId()}
                className="drop-shadow-lg"
                title={i.username}
                style={{ width: 300 }}
                actions={[
                  <EditOutlined key="edit" onClick={() => editUser(i)} />,
                  <Popconfirm
                    title="提示"
                    description={
                      <>
                        <span className="mr-2">确实删除</span>
                        <Tag color="purple">{i.username}</Tag>?
                      </>
                    }
                    onConfirm={() => DeleteUser(i)}
                    okText="确认"
                    cancelText="取消"
                  >
                    <DeleteOutlined />
                  </Popconfirm>
                ]}
              >
                <p>{i.email}</p>
              </Card>
            )
          })}
        </Flex>
      </Flex>
      <Modal
        title={modelStatus == 'create' ? '新增员工信息' : '修改员工信息'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <ModalContent
          modelStatus={modelStatus}
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        />
      </Modal>
    </>
  )
})
