import { gql } from "apollo-server";

const typeDefs = gql`
  type User {
    id: String
    name: String
    username: String
    email: String
    description: String
    password: String
    avatar: String
    role: String
    createdAt: String
  }

  type MutationResponse {
    message: String
    success: Boolean
  }

  type Token {
    token: String
  }

  type Report {
    id: String
    name: String
    type: String
    image: String
    proteins: Int
    carbohydrates: Int
    calories: Int
    isFavorite: Int
    feeling: Int
    idUser: String
    date: String
    createdAt: String
  }

  # Input

  input RegisterInput {
    name: String
    username: String
    email: String
    password: String
  }

  input LoginInput {
    email: String
    password: String
  }

  input ReportInput {
    name: String
    type: String
    image: String
    proteins: Int
    carbohydrates: Int
    calories: Int
    isFavorite: Int
    feeling: Int
    idUser: String
    date: String
  }

  type Query {
    # User
    getUsers: [User]
    getUser(id: String, username: String): User

    # Report
    getReports(idUser: String!, date: String): [Report]
    getReport(id: String!): Report
  }

  type Mutation {
    # User
    register(input: RegisterInput!): MutationResponse
    login(input: LoginInput!): Token

    # Report
    createReport(input: ReportInput!): MutationResponse
    updateReport(input: ReportInput!, id: String): MutationResponse
    deleteReport(id: String!): MutationResponse
  }
`;

export default typeDefs;
