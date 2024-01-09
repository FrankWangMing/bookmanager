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

export const uploadBooks: any = (data: any) => {
  return client.mutate({
    mutation: gql`
      mutation CreateBook {
        createBook(data: ${{
          address: '1',
          author: 'JJ',
          bookNumber: 122123,
          classification: 'SDF',
          discount: 12,
          format: 'SDF',
          name: '12',
          price: 12,
          printTime: '12',
          publish: '222',
          readership: '123',
          stock: 123,
          supplierCode: 'wang'
        }}) {
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
