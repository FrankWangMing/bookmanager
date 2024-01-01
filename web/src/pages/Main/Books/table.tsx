import { observer } from 'mobx-react-lite'
import { SearchOutlined } from '@ant-design/icons'
import React, { useEffect, useRef, useState } from 'react'
import Highlighter from 'react-highlight-words'
import type { InputRef } from 'antd'
import { Button, Input, Space, Table } from 'antd'
import type { ColumnType, ColumnsType } from 'antd/es/table'
import type { FilterConfirmProps } from 'antd/es/table/interface'
import { viewmodel } from 'model'

interface DataType {
  key: string
  bookNumber: number //图书编号
  name: string //书名
  publish: string //出版社
  discount: number //折扣
  stock: number //库存
  price: number //价格
  author: string //作者
  print_time: string //印刷时间
  readership: string //读者对象
  classification: string //中图分类
  address: string //库位
  format: string //开本
}

type DataIndex = keyof DataType

export default observer(() => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const [data, setData] = useState<DataType[]>([])
  const searchInput = useRef<InputRef>(null)
  useEffect(() => {
    console.log('books')
    setData(viewmodel.booksModel.booksList)
  }, [viewmodel.booksModel.booksList])
  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters: () => void) => {
    clearFilters()
    setSearchText('')
  }

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false })
              setSearchText((selectedKeys as string[])[0])
              setSearchedColumn(dataIndex)
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close()
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100)
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      )
  })

  const columns: ColumnsType<DataType> = [
    {
      title: '图书编号',
      dataIndex: 'bookNumber',
      key: 'bookNumber',
      ...getColumnSearchProps('bookNumber')
    },
    {
      title: '书名',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name')
    },
    {
      title: '出版社',
      dataIndex: 'publish',
      key: 'publish',
      ...getColumnSearchProps('publish')
    },
    {
      title: '定价',
      dataIndex: 'price',
      key: 'price',
      ...getColumnSearchProps('price')
    },
    {
      title: '折扣',
      dataIndex: 'discount',
      key: 'discount',
      ...getColumnSearchProps('discount')
    },
    {
      title: '库存',
      dataIndex: 'stock',
      key: 'stock',
      ...getColumnSearchProps('stock')
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
      ...getColumnSearchProps('author')
    },
    {
      title: '印刷时间',
      dataIndex: 'print_time',
      key: 'print_time',
      ...getColumnSearchProps('print_time')
    },
    {
      title: '读者对象',
      dataIndex: 'readership',
      key: 'readership',
      ...getColumnSearchProps('readership')
    },
    {
      title: '中图分类',
      dataIndex: 'classification',
      key: 'classification',
      ...getColumnSearchProps('classification')
      // sorter: (a, b) => a.address.length - b.address.length,
      // sortDirections: ['descend', 'ascend'],
    }
  ]

  return <Table columns={columns} dataSource={data} />
})
