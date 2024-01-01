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
        }
      }
    `
  })
}
