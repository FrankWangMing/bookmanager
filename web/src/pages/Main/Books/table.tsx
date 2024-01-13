export interface DataType {
  id: string
  key: string
  bookNumber: number //图书编号
  name: string //书名
  publish: string //出版社
  discount: number //折扣
  stock: number //库存
  price: number //价格
  author: string //作者
  printTime: string //印刷时间
  readership: string //读者对象
  classification: string //中图分类
  address: string //库位
  format: string //开本
}

import { EllipsisOutlined, PlusOutlined, DownOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable, TableDropdown } from '@ant-design/pro-components'
import { Button, Dropdown, Space, Tag } from 'antd'
import { useRef } from 'react'
import { viewmodel } from 'model'
import { uniqueId } from 'lodash'
export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time)
}

const columns: ProColumns<DataType>[] = [
  {
    key: 'bookNumber',
    title: '图书编号',
    dataIndex: 'bookNumber',
    copyable: true,
    ellipsis: true,
    valueType: 'text',
    tip: '标题过长会自动收缩',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项'
        }
      ]
    }
  },
  {
    title: '书名',
    key: 'name',
    dataIndex: 'name',
    valueType: 'text',
    sorter: true
  },
  {
    title: '出版社',
    key: 'publish',
    dataIndex: 'publish',
    valueType: 'text',
    sorter: true
  },
  {
    title: '定价',
    key: 'price',
    dataIndex: 'price',
    valueType: 'text',
    sorter: true
  },
  {
    title: '折扣',
    key: 'discount',
    dataIndex: 'discount',
    valueType: 'text',
    sorter: true
  },
  {
    title: '库存',
    key: 'stock',
    dataIndex: 'stock',
    valueType: 'text',
    sorter: true
  },
  {
    title: '作者',
    key: 'author',
    dataIndex: 'author',
    valueType: 'text',
    sorter: true
  },
  {
    title: '读者对象',
    key: 'readership',
    dataIndex: 'readership',
    valueType: 'text',
    sorter: true
  },
  {
    title: '库位',
    key: 'address',
    dataIndex: 'address',
    valueType: 'text',
    sorter: true
  },
  {
    title: '印刷时间',
    dataIndex: 'printTime',
    valueType: 'date',
    hideInTable: true
    // search: {
    // transform: (value) => {
    //   return {
    //     startTime: value[0],
    //     endTime: value[1]
    //   }
    // }
    // }
  },
  {
    title: '中图分类',
    key: 'classification',
    dataIndex: 'classification',
    valueType: 'text',
    sorter: true
    // hideInSearch: true
  },
  {
    title: '供应商',
    key: 'supplierCode',
    dataIndex: 'supplierCode',
    valueType: 'text',
    sorter: true,
    render: (item, record) => {
      console.log(item)
      return (
        <div key={uniqueId()}>
          <Tag>{item}</Tag>
        </div>
      )
    }
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id)
        }}
      >
        编辑
      </a>,
      <Button
        onClick={() => {
          window.open('')
        }}
      >
        比价
      </Button>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' }
        ]}
      />
    ]
  }
]

export default () => {
  const actionRef = useRef<ActionType>()
  return (
    <ProTable<DataType>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sort, filter) => {
        console.log(sort, filter, params)
        await waitTime(2000)
        return viewmodel.booksModel
          .getBooksBySearch({
            ...params
          })
          .then((r) => {
            console.log('booksModel', r)
            return {
              data: r.data,
              page: r.page,
              success: true,
              total: r.total
            }
          })
      }}
      editable={{
        type: 'multiple'
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        defaultValue: {
          option: { fixed: 'right', disable: true }
        },
        onChange(value) {
          console.log('value: ', value)
        }
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto'
      }}
      options={{
        setting: {
          listsHeight: 400
        }
      }}
      // form={{
      //   // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
      //   syncToUrl: (values, type) => {
      //     if (type === 'get') {
      //       return {
      //         ...values,
      //         created_at: [values.startTime, values.endTime]
      //       }
      //     }
      //     return values
      //   }
      // }}
      pagination={{
        pageSize: 10,
        onChange: (page) => console.log(page)
      }}
      dateFormatter="string"
      headerTitle="图书"
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={() => {
            actionRef.current?.reload()
          }}
          type="primary"
        >
          新建
        </Button>,
        <Button key="show">查看日志</Button>,
        <Button key="out">
          导出数据
          <DownOutlined />
        </Button>,
        <Button type="primary" key="primary">
          创建应用
        </Button>,
        <Dropdown
          key="menu"
          menu={{
            items: [
              {
                label: '1st item',
                key: '1'
              },
              {
                label: '2nd item',
                key: '1'
              },
              {
                label: '3rd item',
                key: '1'
              }
            ]
          }}
        >
          <Button>
            <EllipsisOutlined />
          </Button>
        </Dropdown>
      ]}
    />
  )
}
