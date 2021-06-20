import { gql } from "@apollo/client";

export const CREATE_POST_MUTATION = gql`
	mutation createPost($image: String!, $caption: String) {
		createPost(image: $image, caption: $caption) {
			id
			image
			username
			createdAt
			username
			likes {
				id
				username
				createdAt
			}
			likeCount
			comments {
				id
				body
				username
				createdAt
			}
			commentCount
		}
	}
`;
