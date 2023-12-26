import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql
} from '@apollo/client'
export const login = () => {}

const token = localStorage.getItem('token')

export const client = new ApolloClient({
  uri: 'http://123.207.29.109:3000/graphql',
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${token}`
  }
})
