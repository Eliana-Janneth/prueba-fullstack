import { gql } from "@apollo/client";

export const CREATE_MOVEMENT = gql`
  mutation CreateMovement($concept: String!, $amount: Float!, $type: String!, $userId: String!) { 
    addMovement(concept: $concept, amount: $amount, type: $type, userId: $userId) {
      id
      concept
      amount
      date
      type
      user {
        name
      }
    }
  }
`;
