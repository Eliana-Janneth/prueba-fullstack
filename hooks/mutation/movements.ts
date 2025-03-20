import { gql } from "@apollo/client";

export const CREATE_MOVEMENT = gql`
  mutation CreateMovement($input: MovementInput!) {
    addMovement(input: $input) {
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
