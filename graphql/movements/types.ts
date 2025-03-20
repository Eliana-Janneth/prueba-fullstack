import { gql } from "apollo-server-micro";

const Movement = gql`
  enum MovementType {
    INCOME
    EXPENSE
  }

  type Movement {
    id: ID!
    concept: String!
    amount: Float!
    date: String!
    type: MovementType!
    user: User!
  }

  input MovementInput {
    concept: String!
    amount: Float!
    type: MovementType!
    userId: String!
    date: String
  }

  type Query {
    movements(type: String, skip: Int, take: Int): [Movement!]!
    movementsCount(type: String): Int!
  }

  type Mutation {
    addMovement(input: MovementInput!): Movement
  }
`;

export { Movement }