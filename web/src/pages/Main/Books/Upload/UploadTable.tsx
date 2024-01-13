import React from 'react'
import { Space, Table, TableProps, Tag } from 'antd'
import { observer } from 'mobx-react-lite'
import { uniqueId } from 'lodash'

const { Column, ColumnGroup } = Table

interface DataType {
  条码: number
  图书编号: number
  书名: string
  出版社: string
  定价: number
  折扣: number
  库存: number
  开本: string
  作者: string
  中图分类: string
  印刷时间: string
  读者对象: string
}

export default observer(({ data }: { data: DataType[] }) => {
  return (
    <Table dataSource={data}>
      <Column title="条码" dataIndex="条码" key={uniqueId()} />
      <Column title="图书编号" dataIndex="图书编号" key={uniqueId()} />
      <Column title="书名" dataIndex="书名" key={uniqueId()} />
      <Column title="出版社" dataIndex="出版社" key={uniqueId()} />
      <Column title="定价" dataIndex="定价" key={uniqueId()} />
      <Column title="折扣" dataIndex="折扣" key={uniqueId()} />
      <Column title="库存" dataIndex="库存" key={uniqueId()} />
      <Column title="开本" dataIndex="开本" key={uniqueId()} />
      <Column title="作者" dataIndex="作者" key={uniqueId()} />
      <Column title="中图分类" dataIndex="中图分类" key={uniqueId()} />
      <Column title="印刷时间" dataIndex="印刷时间" key={uniqueId()} />
      <Column title="读者对象" dataIndex="读者对象" key={uniqueId()} />
      {/* <Column
        title="Action"
        key="action"
        render={(_: any, record: DataType) => (
          <Space size="middle">
            <a>Invite {record.中图分类}</a>
            <a>Delete</a>
          </Space>
        )}
      /> */}
    </Table>
  )
})
