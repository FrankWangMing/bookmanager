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
          username
          role
        }
      }
    `
  })
}

export const createUser = (data: {
  email: any
  password: any
  username: any
}) => {
  console.log(data)
  const { email, password, username } = data
  return client.mutate({
    mutation: gql`
      mutation {
        signup(
          data: { email: "${email}", password: "${password}", username:  "${username}", }
        ) {
          accessToken
          refreshToken
          user {
            username
            email
          }
        }
      }
    `
  })
}

export const getAllUsers = () => {
  return client.query({
    query: gql`
      query GetAllUsers {
        getAllUsers {
          createdAt
          email
          username
          id
          role
          updatedAt
        }
      }
    `,
    fetchPolicy: 'network-only'
  })
}

export const deleteUserById = (id: any) => {
  return client.mutate({
    mutation: gql`
      mutation DeleteUserById {
        deleteUserById(email: "${id}") {
          createdAt
          email
          id
          role
          updatedAt
          username
        }
      }
    `
  })
}
