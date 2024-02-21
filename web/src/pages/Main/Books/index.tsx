export interface DataType {
  id: string
  key: string
  bookNumber: number //书号
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
import {
  Button,
  Drawer,
  Dropdown,
  Space,
  Tag,
  UploadProps,
  Upload as AntUpload,
  message,
  Modal
} from 'antd'
import { useCallback, useRef, useState } from 'react'
import { viewmodel } from 'model'
import {
  Dictionary,
  NumericDictionary,
  assign,
  entries,
  filter,
  fromPairs,
  includes,
  isNull,
  map,
  toPairs,
  toPairsIn,
  uniqueId
} from 'lodash'
import { read, utils, writeFile } from 'xlsx'
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
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48
  },
  {
    key: 'bookNumber',
    title: '书号',
    dataIndex: 'bookNumber',
    copyable: true,
    valueType: 'text'
  },
  {
    title: '书名',
    key: 'name',
    dataIndex: 'name',
    copyable: true,
    ellipsis: false,
    valueType: 'text'
  },

  {
    title: '出版社',
    key: 'publish',
    dataIndex: 'publish',
    valueType: 'text'
  },
  {
    title: '定价',
    key: 'price',
    dataIndex: 'price',
    valueType: 'text',
    // sorter: true,
    hideInSearch: true
  },
  {
    title: '折扣',
    key: 'discount',
    dataIndex: 'discount',
    valueType: 'text',
    // sorter: true,
    hideInSearch: true
  },
  {
    title: '库存',
    key: 'stock',
    dataIndex: 'stock',
    valueType: 'text',
    // sorter: true,
    hideInSearch: true
  },
  {
    title: '作者',
    key: 'author',
    dataIndex: 'author',
    valueType: 'text',
    hideInSearch: true
  },
  {
    title: '读者对象',
    key: 'readership',
    dataIndex: 'readership',
    valueType: 'text',
    hideInSearch: true
  },
  {
    title: '库位',
    key: 'address',
    dataIndex: 'address',
    valueType: 'text',
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
    hideInSearch: true
  },
  {
    title: '供应商',
    key: 'supplierCode',
    dataIndex: 'supplierCode',
    valueType: 'select',
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
      <Button
        key={uniqueId()}
        onClick={() => {
          window.open(
            `https://s.taobao.com/search?commend=all&ie=utf8&page=1&q=${record.name}&search_type=item&tab=all`
          )
        }}
      >
        比价
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
      console.log(data)
      data = data.map(
        (
          item: Dictionary<unknown> | NumericDictionary<unknown> | undefined
        ) => {
          return fromPairs(
            entries(item)
              .map((i) => {
                console.log(i[0])
                if (i[0] == 'printTime') {
                  return [
                    getChineseKey(i[0]),
                    new Date(i[1] as any).toISOString().slice(0, 10)
                  ]
                }
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
  const props: UploadProps = {
    name: 'file',
    showUploadList: false,
    beforeUpload(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target == null) return
          const arrayBuffer = e.target.result

          if (isNull(arrayBuffer)) return

          const wb = read(arrayBuffer)

          const ws = wb.Sheets[wb.SheetNames[0]] // get the first worksheet

          const data: President[] = utils.sheet_to_json<President>(ws, {
            // header: 1
          }) // generate objects
          console.log(data)
          setSearchBookNumber(
            data
              .filter((i) => i.书号 != undefined)
              .map((i) => {
                return `${i.书号}`
              })
          )
          setSearchIsModalOpen(true)
          resolve(false)
        }
        reader.onerror = (error) => {
          console.error('Error reading file:', error)
          reject()
        }
        reader.readAsArrayBuffer(file)
      })
    }
  }
  const [isSearchModalOpen, setSearchIsModalOpen] = useState(false)
  const [SearchBookNumber, setSearchBookNumber] = useState<string[]>([])

  const handleOk = () => {
    setSearchIsModalOpen(false)

    actionRef.current?.reload()
  }

  const handleCancel = () => {
    setSearchIsModalOpen(false)
  }
  return (
    <>
      <ProTable<DataType>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        params={{}}
        request={async (params) => {
          await waitTime(200)
          return viewmodel.booksModel
            .getBooksBySearch({
              ...params,
              bookNumbers: SearchBookNumber
            })
            .then((r) => {
              console.log(r.data)
              const data = r.data
              setPres(data)
              setSearchBookNumber([])
              return {
                data,
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
        rowKey={uniqueId()}
        search={{
          labelWidth: 'auto',
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
            <AntUpload
              {...props}
              onChange={(info) => {
                if (info.file.status !== 'uploading') {
                  console.log(info.file, info.fileList)
                }
                if (info.file.status === 'done') {
                  console.log(info)
                  message.success(
                    `${info.file.name} file uploaded successfully`
                  )
                } else if (info.file.status === 'error') {
                  message.error(`${info.file.name} file upload failed.`)
                }
              }}
            >
              <Button> 批量查询</Button>
            </AntUpload>
          ]
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
          onChange: (page, size) => {
            console.log(page)
            console.log(size)
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
      <Modal
        title="批量查询"
        open={isSearchModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {SearchBookNumber.map((i) => {
          return <p key={uniqueId()}>{i}</p>
        })}
      </Modal>
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
        <Upload handleOk={handleOk} setIsModalOpen={setIsModalOpen}></Upload>
      </Drawer>
    </>
  )
})
