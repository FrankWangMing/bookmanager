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
  // {
  //   name: "${name}",
  //   bookNumber: ${bookNumber},
  //   author: "${author}",
  //   printTime:"${printTime}",
  //   classification:"${classification}",
  //   publish:"${publish}",
  //   format: "${format}",
  //   discount: ${discount},
  //   address: "${address}",
  //   stock:  ${stock},
  //   price:  ${price},
  //   readership: "${readership}",
  //   supplierCode:"${supplierCode}",
  // }
  return client.mutate({
    mutation: gql`
      mutation {
        createBookMany(
          data: {data:${data}}
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
