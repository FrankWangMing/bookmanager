import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Avatar, Divider, List, Skeleton } from 'antd'
import { BookOutlined } from '@ant-design/icons'

interface DataType {
  gender: string
  name: {
    title: string
    first: string
    last: string
  }
  email: string
  picture: {
    large: string
    medium: string
    thumbnail: string
  }
  nat: string
}

export const Current = observer(({ showModal }) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<DataType[]>([])

  const loadMoreData = () => {
    if (loading) {
      return
    }
    setLoading(true)
    fetch(
      'https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo'
    )
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results])
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    loadMoreData()
  }, [])

  return (
    <div
      id="scrollableDiv"
      className="rounded-md h-100       overflow-hidden overflow-y-auto"
      style={{
        overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
        height: '83vh'
      }}
    >
      <List
        dataSource={[...data, ...data, ...data]}
        renderItem={(item) => (
          <List.Item key={item.email}>
            <List.Item.Meta
              avatar={<BookOutlined />}
              title={'书名'}
              description={item.email}
            />
            <div>库存</div>
          </List.Item>
        )}
      />
    </div>
  )
})
