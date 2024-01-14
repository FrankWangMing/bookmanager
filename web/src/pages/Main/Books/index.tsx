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
import { Button, Drawer, Dropdown, Space, Tag } from 'antd'
import { useCallback, useRef, useState } from 'react'
import { viewmodel } from 'model'
import {
  Dictionary,
  NumericDictionary,
  assign,
  entries,
  fromPairs,
  map,
  toPairs,
  toPairsIn,
  uniqueId
} from 'lodash'
import { utils, writeFile } from 'xlsx'
import Upload, { President } from './Upload'
import { observer } from 'mobx-react-lite'
import { getChildType } from 'mobx-state-tree'
import { getChineseKey } from '../Supplier'

/* get state data and export to XLSX */

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
    valueType: 'text',
    sorter: true
  },
  {
    title: '书名',
    key: 'name',
    dataIndex: 'name',
    copyable: true,
    ellipsis: true,
    valueType: 'text',
    tip: '标题过长会自动收缩'
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
    sorter: true,
    hideInSearch: true
  },
  {
    title: '折扣',
    key: 'discount',
    dataIndex: 'discount',
    valueType: 'text',
    sorter: true,
    hideInSearch: true
  },
  {
    title: '库存',
    key: 'stock',
    dataIndex: 'stock',
    valueType: 'text',
    sorter: true,
    hideInSearch: true
  },
  {
    title: '作者',
    key: 'author',
    dataIndex: 'author',
    valueType: 'text',
    sorter: true,
    hideInSearch: true
  },
  {
    title: '读者对象',
    key: 'readership',
    dataIndex: 'readership',
    valueType: 'text',
    sorter: true,
    hideInSearch: true
  },
  {
    title: '库位',
    key: 'address',
    dataIndex: 'address',
    valueType: 'text',
    sorter: true,
    hideInSearch: true
  },
  {
    title: '印刷时间',
    dataIndex: 'printTime',
    valueType: 'date',
    hideInSearch: true
  },
  {
    title: '中图分类',
    key: 'classification',
    dataIndex: 'classification',
    valueType: 'text',
    sorter: true,
    hideInSearch: true
  },
  {
    title: '供应商',
    key: 'supplierCode',
    dataIndex: 'supplierCode',
    valueType: 'select',
    sorter: true,
    valueEnum: () => {
      return viewmodel.supplierModel.supplierList.reduce(
        (pre, current: any) => {
          return assign(pre, {
            [current['code']]: {
              text: current.code
            }
          })
        },
        {}
      )
    }
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="delete"
        onClick={() => {
          action?.startEditable?.(record.id)
        }}
      >
        删除
      </a>,
      <Button
        key="bijia"
        onClick={() => {
          window.open(
            'https://s.taobao.com/search?commend=all&ie=utf8&initiative_id=tbindexz_20170306&q=%E5%9B%BE%E4%B9%A6&search_type=item&sourceId=tb.index&spm=a21bo.jianhua.201856-taobao-item.2&ssid=s5-e'
          )
        }}
      >
        淘宝比价
      </Button>
    ]
  }
]

export const Books = observer(() => {
  const [pres, setPres] = useState<President[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const actionRef = useRef<ActionType>()
  const exportFile = useCallback(
    async (r?: string) => {
      let data: any = pres
      if (r) {
        data = await viewmodel.booksModel.fetchBooksList()
      }
      data = data.map(
        (
          item: Dictionary<unknown> | NumericDictionary<unknown> | undefined
        ) => {
          return fromPairs(
            entries(item)
              .map((i) => {
                return [getChineseKey(i[0]), i[1]]
              })
              .filter((i) => i[0])
          )
        }
      )
      /* generate worksheet from state */
      const ws = utils.json_to_sheet(data)
      /* create workbook and append worksheet */
      const wb = utils.book_new()
      utils.book_append_sheet(wb, ws, 'Data')
      /* export to XLSX */
      writeFile(wb, `all${Date.now()}.xlsx`)
    },
    [pres]
  )

  return (
    <>
      <ProTable<DataType>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params, sort, filter) => {
          console.log(sort, filter, params)
          await waitTime(500)
          return viewmodel.booksModel
            .getBooksBySearch({
              ...params
            })
            .then((r) => {
              setPres(r.data)
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
        rowKey="bookNumber"
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
          onChange: (page) => {
            console.log(page)
          }
        }}
        dateFormatter="string"
        headerTitle="图书"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              setIsModalOpen(true)

              // actionRef.current?.reload()
            }}
            type="primary"
          >
            新建图书
          </Button>,
          // <Button key="show">查看日志</Button>,
          <Dropdown
            key="menu"
            menu={{
              items: [
                {
                  label: '当前',
                  key: '1',
                  onClick: () => {
                    exportFile()
                  }
                },
                {
                  label: '所有',
                  key: '2',
                  onClick: () => {
                    exportFile('all')
                  }
                }
              ]
            }}
          >
            <Button key="out">
              导出数据
              <DownOutlined />
            </Button>
          </Dropdown>
        ]}
      />
      <Drawer
        title={'上传图书'}
        placement="right"
        onClose={() => {
          setIsModalOpen(false)
        }}
        open={isModalOpen}
        size={'large'}
        width={1800}
      >
        <Upload></Upload>
      </Drawer>
    </>
  )
})
