import { client } from '../../../service'
import { gql } from '@apollo/client'

type createTravelProps = {
  content: string
  title: string
}
export const createTravel = ({ content, title }: createTravelProps) => {
  return client.mutate({
    mutation: gql`
      mutation CreateTravel {
        createTravel(createTravelInput: { content: "${content}", title: "${title}" }) {
          content
          createdAt
          id
          title
          updatedAt
        }
      }
    `
  })
}
