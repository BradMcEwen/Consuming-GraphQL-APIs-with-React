import { gql } from "urql";


export const GET_POSTS = gql`
query {
    posts(userId: 1) {
      data {
        id
        userId
        title
        body
      }
    }
  }
  `;