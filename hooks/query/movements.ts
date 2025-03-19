
import { gql } from "@apollo/client";

export const GET_MOVEMENTS = gql`
  query GetMovements {
    movements {
      id
      concept
      amount
      date
      user {
        name
      }
    }
  }
`;

export const GET_MOVEMENT = gql`
    query GetMovement($id: ID!) {
        movement(id: $id) {
        id
        concept
        amount
        date
        user {
            name
        }
        }
    }
    `;