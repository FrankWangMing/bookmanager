import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { viewmodel } from '../../../model'
import { Space, Card, Button, Modal, Flex } from 'antd'
import { EditOutlined } from '@ant-design/icons';
import ModalContent from './ModalContent';
export const Users = observer(() => {
    useEffect(() => {
        console.log(viewmodel.userModel.userInfo)
    }, [])
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Flex gap="middle" vertical justify={'flex-start'}>
                <div>
                    <Button onClick={showModal} type="primary" >新增员工</Button>
                </div>
                <Space>
                    <Card
                        className='drop-shadow-lg' title="员工1" style={{ width: 300, }}
                        actions={[
                            <EditOutlined key="edit" onClick={showModal} />,
                        ]}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </Space>
            </Flex>

            <Modal title="员工信息" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <ModalContent />
            </Modal></>

    )
})
