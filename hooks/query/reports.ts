import { gql } from "@apollo/client";

export const GET_FINANCIAL_SUMMARY = gql`
  query GetAllMovements {
    allMovements {
      id
      concept
      amount
      type
      date
      user {
        name
      }
    }
  }
`;
