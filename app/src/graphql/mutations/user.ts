import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      token
    }
  }
`

export const REGISTER = gql`
  mutation register($input: RegisterInput!) {
    register(input: $input) {
      message
      success
    }
  }
`
