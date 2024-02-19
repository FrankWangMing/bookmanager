import React from 'react'
import { Space, Table, TableProps, Tag } from 'antd'
import { observer } from 'mobx-react-lite'
import { uniqueId, valuesIn } from 'lodash'
import { CheckCircleOutlined } from '@ant-design/icons'

const { Column, ColumnGroup } = Table

export interface DataType {
  条码: string
  书号: string
  书名: string
  出版社: string
  定价: string
  折扣: string
  库存: string
  开本: string
  作者: string
  中图分类: string
  印刷时间: string
  读者对象: string
}

export default observer(({ data }: { data: DataType[] }) => {
  return (
    <Table dataSource={data}>
      {/* <Column title="条码" dataIndex="条码" key={uniqueId()} /> */}
      <Column title="书号" dataIndex="书号" key={uniqueId()} />
      <Column title="书名" dataIndex="书名" key={uniqueId()} />
      <Column title="出版社" dataIndex="出版社" key={uniqueId()} />
      <Column title="定价" dataIndex="定价" key={uniqueId()} />
      <Column title="折扣" dataIndex="折扣" key={uniqueId()} />
      <Column title="库存" dataIndex="库存" key={uniqueId()} />
      <Column title="开本" dataIndex="开本" key={uniqueId()} />
      <Column title="作者" dataIndex="作者" key={uniqueId()} />
      <Column title="中图分类" dataIndex="中图分类" key={uniqueId()} />
      <Column
        title="印刷时间"
        dataIndex="印刷时间"
        render={(i: Date) => {
          return <div>{i.toISOString().slice(0, 10)}</div>
        }}
        key={uniqueId()}
      />
      <Column title="读者对象" dataIndex="读者对象" key={uniqueId()} />
      <Column
        title="状态"
        dataIndex="status"
        key={uniqueId()}
        render={(i) => {
          console.log(i)
          return (
            <div>
              {valuesIn(i).length > 0 ? (
                valuesIn(i).map((_i) => <Tag color="red">{_i.name}</Tag>)
              ) : (
                <CheckCircleOutlined
                  style={{
                    color: 'green'
                  }}
                />
              )}
            </div>
          )
        }}
      />
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
