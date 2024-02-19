import { observer } from 'mobx-react-lite'
import {
  Button,
  Collapse,
  Form,
  Input,
  Popconfirm,
  Tag,
  notification
} from 'antd'
import { useState } from 'react'
import ModalSupplierContent from './ModalSupplierContent'
import { modelStatusType } from '../Users'
import { viewmodel } from 'model'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import UploadTable from '../Books/Upload/UploadTable'
import {
  entries,
  filter,
  find,
  fromPairs,
  get,
  matches,
  uniqueId
} from 'lodash'
import { SearchProps } from 'antd/es/input'
import { t } from 'mobx-state-tree'

export const getChineseKey = (value: string) => {
  return {
    // 条码: 'j',
    bookNumber: '书号',
    name: '书名',
    publish: '出版社',
    price: '定价',
    discount: '折扣',
    stock: '库存',
    format: '开本',
    author: '作者',
    printTime: '印刷时间',
    classification: '中图分类',
    readership: '读者对象',
    address: '库位',
    supplierCode: '供应商'
  }[value]
}
export default observer(() => {
  const [form] = Form.useForm()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [status, setStatus] = useState<modelStatusType>('create')
  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
    const { code, name } = form.getFieldsValue(['code', 'name'])
    if (status == 'create') {
      viewmodel.supplierModel.createSupplier(code, name).then((r) => {
        console.log(r)
        viewmodel.supplierModel.fetchSupplierList()
      })
    }
    if (status == 'edit') {
      viewmodel.supplierModel.updateSupplier(code, name).then((r) => {
        console.log(r)
        viewmodel.supplierModel.fetchSupplierList()
      })
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const onChange = () => {}

  const { Search } = Input
  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
    console.log(info?.source, value)
    const users = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      { id: 3, name: 'Doe' }
    ]

    const matcher = matches({ name: '*J*' })
    const result = find(users, matcher)

    console.log(result)
  }
  const addSupplier = () => {
    setStatus('create')
    showModal()
    form.setFieldsValue({
      name: '',
      code: ''
    })
  }

  const editSupplier = (data: { name: any; code: any }) => {
    setStatus('edit')
    showModal()
    form.setFieldsValue({
      name: data.name,
      code: data.code
    })
  }
  const deleteSupplier = async (data: { name: any; code: any }) => {
    const supplier = await viewmodel.supplierModel.deleteSupplier(
      data.code,
      data.name
    )
    await viewmodel.supplierModel.fetchSupplierList()
    notification.success({
      message: '删除成功',
      description: `已经删除   ${get(supplier, 'data.deleteSupplier.name')}`
      // duration: 600
    })
  }

  return (
    <div className="max-h-full">
      <div className="h-18 m-3 flex items-center">
        <Search
          className="w-full flex-1"
          placeholder="输入供应商名称或供应商代码"
          allowClear
          enterButton="搜索"
          size="large"
          onSearch={onSearch}
        />
        <Button
          type="primary"
          onClick={addSupplier}
          size="large"
          className="ml-2"
        >
          新增供应商
        </Button>
      </div>
      <Collapse
        accordion
        key={uniqueId('co')}
        defaultActiveKey={['1']}
        onChange={onChange}
        expandIconPosition={'end'}
        items={viewmodel.supplierModel.supplierList
          .filter((i) => {
            console.log(i)
            return i
          })
          .map((i: any) => ({
            key: i.code,
            label: (
              <>
                <span>{i.name}</span> <Tag color="pink"> {i.code}</Tag>
              </>
            ),
            children: (
              <div key={uniqueId()}>
                <UploadTable
                  data={i.books.map((book: any) => {
                    return {
                      key: uniqueId(),
                      ...fromPairs(
                        entries(book).map((i) => {
                          return [getChineseKey(i[0]), i[1]]
                        })
                      )
                    }
                  })}
                ></UploadTable>
              </div>
            ),
            extra: (
              <>
                <Popconfirm
                  placement="left"
                  title={'提示'}
                  description={'如果删除供应商，会删除该供应商的所有书籍'}
                  okText="确认"
                  cancelText="取消"
                  onCancel={(event) => {
                    if (event) event.stopPropagation()
                  }}
                  onConfirm={(event) => {
                    deleteSupplier(i)
                    if (event) event.stopPropagation()
                  }}
                >
                  <DeleteOutlined
                    className=" rounded-xl p-2 hover:bg-gray-400"
                    onClick={(event) => {
                      event.stopPropagation()
                    }}
                  />
                </Popconfirm>

                <EditOutlined
                  className=" rounded-xl p-2 hover:bg-gray-400"
                  onClick={(event) => {
                    editSupplier(i)
                    event.stopPropagation()
                  }}
                />
              </>
            )
          }))}
      />
      <ModalSupplierContent
        form={form}
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        status={status}
      />
    </div>
  )
})
//
