import { gql } from '@apollo/client'
import { client } from './index'

export const supplierList: any = () => {
  return client.query({
    query: gql`
      query GetSupplier {
        getSupplier {
          createdAt
          id
          name
          updatedAt
          code
          books {
            address
            author
            bookNumber
            classification
            createdAt
            discount
            format
            id
            name
            price
            printTime
            publish
            readership
            stock
            supplierCode
            updatedAt
          }
        }
      }
    `,
    fetchPolicy: 'network-only'
  })
}

export const createSupplier: any = (code: string, name: string) => {
  return client.mutate({
    mutation: gql`
      mutation CreateSupplier {
        createSupplier(data: { code: "${code}", name: "${name}" }) {
          code
          createdAt
          id
          name
          updatedAt
        }
      }
    `
  })
}

export const updateSupplier: any = (code: string, name: string) => {
  return client.mutate({
    mutation: gql`
      mutation CreateSupplier {
        updateSupplier(data: { code: "${code}", name: "${name}" }) {
          code
          createdAt
          id
          name
          updatedAt
        }
      }
    `
  })
}
