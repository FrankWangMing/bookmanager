import { useUpdateEffect } from 'ahooks'
import { Button, Space, Input, Divider, List, Avatar } from 'antd'
import { SearchProps } from 'antd/es/input'
import { observer } from 'mobx-react-lite'
import { viewmodel } from 'model'
import { useEffect, useState } from 'react'
const { Search } = Input

export const Items = observer(() => {
  const [data, setData] = useState([])
  useEffect(() => {
    setData(viewmodel.supplierModel.supplierList)
    console.log('viewmodel', viewmodel.supplierModel.supplierList)
  }, [viewmodel.supplierModel.supplierList])

  const onSearch: SearchProps['onSearch'] = (value, _e, info) =>
    console.log(info?.source, value)
  const [select, setSelect] = useState(1)
  return (
    <div className="border-spacing-1 min-h-4  ">
      <div className="h-18 items-center flex">
        <Search
          className="flex-1 w-full"
          placeholder="输入供应商名称或供应商代码"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />
        <Button type="primary" size="large" className="ml-2">
          新增供应商
        </Button>
      </div>
      <div className="mt-4 max-h-full ">
        {
          <List
            bordered={true}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item
                onClick={() => setSelect(item.code)}
                className={`cursor-pointer hover:bg-slate-400 ${
                  index == select && 'bg-gray-500'
                }`}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                    />
                  }
                  title={<a href="https://ant.design">{item.name}</a>}
                  description={item.code}
                />
              </List.Item>
            )}
          />
        }
      </div>
    </div>
  )
})
