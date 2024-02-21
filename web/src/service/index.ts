import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { message } from 'antd/lib'
import { get } from 'lodash'
import { router } from 'router/router'

const httpLink = createHttpLink({
  uri: 'http://127.0.0.1:3000/graphql'
  //uri: 'http://101.42.33.99:3000/graphql'
})

const authLink = new ApolloLink((operation, forward) => {
  // 在这里添加你的认证逻辑，包括将令牌添加到请求头中
  // ...
  // 获取令牌（这里假设你的令牌是存储在本地的）
  const token = localStorage.getItem('token')

  // 将令牌添加到请求头中
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : ''
    }
  }))
  return forward(operation)
})

const errorLink = onError(({ response, networkError }) => {
  console.log('response', response)
  console.log('networkError', networkError)
  if (networkError) message.error(get(networkError, '', null))
  if (response) message.error(get(response, 'errors[0].message', null))
  if (get(response, 'errors[0].extensions.code', null) == 'UNAUTHENTICATED') {
    router.navigate('/login')
  }
  // 令牌失效，触发重新获取令牌的逻辑
  // if (networkError && networkError.statusCode === 401) {
  //   refreshToken()
  //     .then((newToken) => {
  //       // 更新应用程序状态中的令牌信息
  //       updateToken(newToken)

  //       // 返回一个可用于重试请求的 Observable
  //       operation.setContext(({ headers = {} }) => ({
  //         headers: {
  //           ...headers,
  //           Authorization: `Bearer ${newToken}`
  //         }
  //       }))
  //       return forward(operation)
  //     })
  //     .catch((error) => {
  //       // 处理重新获取令牌失败的情况
  //       console.error('Failed to refresh token:', error)

  //       // 可以选择清除应用程序状态中的令牌信息，强制用户重新登录等
  //     })
  // }
})

const link = ApolloLink.from([errorLink, authLink, httpLink])

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})
