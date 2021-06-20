import { gql } from "@apollo/client";

export const FETCH_POST_QUERY = gql`
  query:($postId: ID!) {
    getPost(postId: $postId) {
      id
      image
      caption
      createdAt
      username
      likeCount 
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;
