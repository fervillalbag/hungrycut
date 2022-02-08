import { gql } from '@apollo/client'

export const CREATE_REPORT = gql`
  mutation createReport($input: ReportInput!) {
    createReport(input: $input) {
      message
      success
    }
  }
`
