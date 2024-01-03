import { client } from './index'
import { gql, useMutation } from '@apollo/client'

export type LoginProps = {
  email: string
  password: string
}
// Define mutation
export const login = ({ email, password }: LoginProps) => {
  console.log('LOGIN', email, password)
  return client.mutate({
    mutation: gql`
      mutation {
        login(data: { email:"${email}", password:"${password}" }) {
          accessToken
          refreshToken
        }
      }
    `
  })
}

export const userInfo = () => {
  return client.query({
    query: gql`
      query {
        me {
          id
          email
          firstname
          lastname
          role
        }
      }
    `
  })
}
