import { gql } from "@apollo/client";

export const FETCH_POSTS_QUERY = gql`
	query getPosts {
		getPosts {
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
