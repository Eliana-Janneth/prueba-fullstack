import { gql } from "apollo-server-micro";

const Movement = gql`
  type Movement {
    id: ID!
    concept: String!
    amount: Float!
    date: String!
    type: String!
    user: User!
  }

 type Query {
  movements(type: String): [Movement!]!
}

  type Mutation {
    addMovement(concept: String!, amount: Float!, type:String!, userId: String!): Movement
  }

`;

export { Movement }