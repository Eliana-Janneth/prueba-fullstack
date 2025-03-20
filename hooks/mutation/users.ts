import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
  mutation UpdateUser($input: UserUpdateInput!) {
    updateUser(input: $input) {
      id
      name
      role
    }
  }
`;
