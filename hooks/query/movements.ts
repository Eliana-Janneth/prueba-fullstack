import { gql } from "@apollo/client";

export const GET_MOVEMENTS = gql`
  query GetMovements($type: String, $skip: Int, $take: Int) {
    movements(type: $type, skip: $skip, take: $take) {
      id
      concept
      amount
      date
      type
      user {
        name
      }
    }
    movementsCount
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

export const GET_BALANCE = gql`
  query GetBalanceTotal {
    balanceTotal {
      ingresos
      egresos
      balance
    }
  }
`;
