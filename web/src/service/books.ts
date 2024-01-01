import { gql } from '@apollo/client'
import { client } from './index'

export const bookList: any = () => {
  return client.query({
    query: gql`
      query GetBooks {
        getBooks {
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
    `
  })
}
