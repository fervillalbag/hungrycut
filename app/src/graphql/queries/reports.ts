import { gql } from '@apollo/client'

export const GET_REPORTS = gql`
  query getReports($idUser: String!, $date: String) {
    getReports(idUser: $idUser, date: $date) {
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
      date
      createdAt
    }
  }
`
