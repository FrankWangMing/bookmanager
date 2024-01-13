import { gql } from '@apollo/client'
import { client } from './index'
import { random } from 'lodash'

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

export const getBooksBySearch: any = (data: any) => {
  return client.query({
    query: gql`
      query getBooksBySearch($data: SearchBookInput!) {
        getBooksBySearch(data: $data) {
          page
          total
          data {
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
    variables: {
      data
    }
  })
}

export const uploadBooks: any = (data: any) => {
  console.log(data)

  const address = '123'
  const author = '123'
  const bookNumber = 289112
  const classification = 'hjkhkj'
  const discount = 9.0
  const format = 'jk'
  const name = 'klj;'
  const price = 1123
  const printTime = '2015-5-5'
  const publish = 'ihiuhjilj'
  const readership = 'uihoijhlkjlkj'
  const stock = 222
  const supplierCode = 'wang'

  return client.mutate({
    mutation: gql`
      mutation {
        createBook(
          data: {
            name: "${name}",
            bookNumber: ${bookNumber},
            author: "${author}",
            printTime:"${printTime}",
            classification:"${classification}",
            publish:"${publish}",
            format: "${format}",
            discount: ${discount},
            address: "${address}",
            stock:  ${stock},
            price:  ${price},
            readership: "${readership}",
            supplierCode:"${supplierCode}",
          }
        ) {
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
    `,
    variables: {
      name,
      bookNumber,
      author,
      printTime,
      classification,
      publish,
      format,
      discount,
      address,
      stock,
      price,
      readership,
      supplierCode: supplierCode
    }
  })
}

export const uploadManyBooks: any = (data: any) => {
  return client.mutate({
    mutation: gql`
      mutation CreateManyBook($data: [CreateBookInput!]!) {
        CreateManyBook(data: $data)
      }
    `,
    variables: {
      data: data[0].map(
        (i: {
          address: any
          author: any
          bookNumber: any
          classification: any
          discount: any
          format: any
          name: any
          price: any
          printTime: any
          publish: any
          readership: any
          stock: any
          supplierCode: any
        }) => ({
          address: i.address,
          author: i.author,
          bookNumber: i.bookNumber,
          classification: i.classification,
          discount: i.discount,
          format: i.format,
          name: i.name,
          price: i.price,
          printTime: i.printTime,
          publish: i.publish,
          readership: i.readership,
          stock: i.stock,
          supplierCode: i.supplierCode
        })
      )
    }
  })
}
