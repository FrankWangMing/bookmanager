import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { viewmodel } from '../../../model'
import { Space, Card, Button, Modal, Flex } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import ModalContent from './ModalContent'
import { useForm } from 'antd/es/form/Form'
import { uniqueId } from 'lodash'
export const Users = observer(() => {
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
    console.log('Success:', values)
    viewmodel.userModel.createUserInfo(values).then((r) => {
      console.log(r)
      viewmodel.userModel.getUsers().then((r) => {
        console.log(viewmodel.userModel.allUsers.length)
      })
    })
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

  const [form] = useForm()
  useEffect(() => {
    viewmodel.userModel.getUsers()
  }, [])
  return (
    <>
      <Flex gap="middle" vertical justify={'flex-start'}>
        <div>
          <Button onClick={showModal} type="primary">
            新增员工
          </Button>
        </div>
        <Space>
          {viewmodel.userModel.allUsers.map((i) => {
            return (
              <Card
                key={uniqueId()}
                className="drop-shadow-lg"
                title={i.username}
                style={{ width: 300 }}
                actions={[
                  <EditOutlined key="edit" onClick={showModal} />,
                  <DeleteOutlined onClick={() => DeleteUser(i)} />
                ]}
              >
                <p>{i.email}</p>
              </Card>
            )
          })}
        </Space>
      </Flex>

      <Modal
        title="员工信息"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <ModalContent
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        />
      </Modal>
    </>
  )
})
