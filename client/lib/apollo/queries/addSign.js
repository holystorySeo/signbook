import { gql } from "@apollo/client";

const ADD_SIGN = gql`
  mutation ($content: String!, $nickname: String!, $country: String!) {
    addSign(content: $content, nickname: $nickname, country: $country) {
      id
      content
      nickname
      country
    }
  }
`;

export default ADD_SIGN;
