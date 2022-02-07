import { gql } from '@apollo/client'

export const GET_USER = gql`
  query getUser($id: String, $username: String) {
    getUser(id: $id, username: $username) {
      id
      name
      username
      email
      description
      password
      avatar
      role
      createdAt
    }
  }
`
