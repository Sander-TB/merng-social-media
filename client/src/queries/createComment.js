import { gql } from "@apollo/client";

export const SUBMIT_COMMENT_MUTATION = gql`
	mutation ($postId: ID!, $body: String!) {
		createComment(postId: $postId, body: $body) {
			id
			comments {
				id
				body
				createdAt
				username
			}
			commentCount
		}
	}
`;
