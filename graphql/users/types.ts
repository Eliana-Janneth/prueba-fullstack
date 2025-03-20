import { gql } from "apollo-server-micro";

const User = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    phone: String
    role: String!
  }

 input UserInput {
    name: String!
    email: String!
    phone: String
    role: String!
  }

  type Query{
    users: [User]!
    user(email: String!): User
  }

  input UserUpdateInput {
    id: ID!
    name: String!
    role: String!
  }

  type Mutation {
    updateUser(input: UserUpdateInput!): User
  }
`;

export { User }