import { Button, Input, List, Avatar, Flex } from 'antd'
import { SearchProps } from 'antd/es/input'
import { observer } from 'mobx-react-lite'
import { viewmodel } from 'model'
import { useEffect, useState } from 'react'
import { EditOutlined } from '@ant-design/icons'
const { Search } = Input

export const Items = observer(({ showModal }) => {
  const [select, setSelect] = useState(null)
  const [data, setData] = useState([])
  useEffect(() => {
    setData(viewmodel.supplierModel.supplierList)
    console.log('viewmodel', viewmodel.supplierModel.supplierList)
  }, [viewmodel.supplierModel.supplierList])
  useEffect(() => {
    if (select)
      console.log(viewmodel.supplierModel.fetchBooksBySupplierCode(select))
  }, [select])
  const onSearch: SearchProps['onSearch'] = (value, _e, info) =>
    console.log(info?.source, value)
  return (
    <div
      className="border-spacing-1 min-h-4 overflow-hidden overflow-y-auto"
      style={{
        height: '83vh'
      }}
    >
      <div className="h-18 items-center flex">
        <Search
          className="flex-1 w-full"
          placeholder="输入供应商名称或供应商代码"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />
        <Button
          type="primary"
          onClick={showModal}
          size="large"
          className="ml-2"
        >
          新增供应商
        </Button>
      </div>
      <div className="mt-4 max-h-full">
        {
          <List
            bordered={true}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item: any, index) => (
              <List.Item
                onClick={() => {
                  console.log('D')
                  setSelect(select == null ? item.code : null)
                }}
                className={`cursor-pointer hover:bg-gray-200 ${
                  item.code == select && 'bg-gray-200'
                }`}
              >
                <div className="flex items-center min-w-full">
                  <div className="flex-1 flex-col justify-center">
                    <div className="text-lg">{item.name}</div>
                    <div className="text text-gray-400">{item.code}</div>
                  </div>
                  <EditOutlined
                    className=" hover:bg-gray-400 p-2 rounded-xl"
                    onClick={showModal}
                  />
                </div>
              </List.Item>
            )}
          />
        }
      </div>
    </div>
  )
})
