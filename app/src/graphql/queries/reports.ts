import { gql } from '@apollo/client'

export const GET_REPORTS = gql`
  query getReports($idUser: String!) {
    getReports(idUser: $idUser) {
      id
      name
      type
      image
      proteins
      carbohydrates
      calories
      isFavorite
      feeling
      idUser
      createdAt
    }
  }
`
