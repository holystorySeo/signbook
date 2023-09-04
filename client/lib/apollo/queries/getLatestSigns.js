import { gql } from "@apollo/client";

const GET_LATES_SIGNS = gql`
  query {
    signs {
      id
      content
      nickname
      country
      created_at
    }
  }
`;

export default GET_LATES_SIGNS;
