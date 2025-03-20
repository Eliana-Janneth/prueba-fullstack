import { gql } from "@apollo/client";

export const GET_FINANCIAL_SUMMARY = gql`
  query GetFinancialSummary {
    incomes: movements(type: "INCOME") {
      amount
    }
    expenses: movements(type: "EXPENSE") {
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
