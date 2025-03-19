import { gql } from "@apollo/client";

export const GET_FINANCIAL_SUMMARY = gql`
  query GetFinancialSummary {
    incomes: movements(type: "income") {
      amount
    }
    expenses: movements(type: "expense") {
      amount
    }
    movements {
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
