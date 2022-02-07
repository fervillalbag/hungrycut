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

  type Query {
    hello: String
  }

  type Mutation {
    register(input: RegisterInput!): MutationResponse
    login(input: LoginInput!): Token
  }
`;

export default typeDefs;
