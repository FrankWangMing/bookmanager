import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'
import { ApolloProvider } from '@apollo/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/router'
import { client } from './service'
import 'index.css'
import { Spin } from 'antd'
const BigSpinner = () => {
  return (
    <div>
      <Spin>加载中。。。</Spin>
    </div>
  )
}

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} fallbackElement={<BigSpinner />} />
  </ApolloProvider>
)
