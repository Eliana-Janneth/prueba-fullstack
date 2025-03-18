import { gql } from "apollo-server-micro";

const Movement = gql`
  type Movement {
    id: ID!
    concept: String!
    amount: Float!
    date: String!
    user: User!
  }

  type Query {
    movements: [Movement]
  }

  type Mutation {
    addMovement(concept: String!, amount: Float!, userId: String!): Movement
  }

`;

export { Movement }