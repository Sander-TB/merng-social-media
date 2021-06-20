import { useQuery } from "@apollo/client";
import moment from "moment";
import { useContext } from "react";

import { AuthContext } from "../../context/auth";
import { FETCH_POST_QUERY } from "../../queries/getOnePost";
import LikeButton from "../buttons/LikeButton";
import DeleteButton from "../buttons/DeleteButton";

export default function SinglePost(props) {
	const postId = props.match.params.postId;
	const { user } = useContext(AuthContext);
	console.log(postId);

	const {
		data: { getPost },
	} = useQuery(FETCH_POST_QUERY, {
		variables: {
			postId,
		},
	});

	let postMarkup;
	if (!getPost) {
		postMarkup = <p>Loading post...</p>;
	} else {
		const {
			id,
			image,
			caption,
			createdAt,
			username,
			comments,
			likes,
			commentCount,
			likeCount,
		} = getPost;

		postMarkup = (
			<div key={id} className='border border-black mb-5 w-1/4'>
				<div className='flex mb-1 items-center justify-between'>
					<div className='flex items-center'>
						<img
							src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
							alt='avatar'
							className='w-10'
						/>
						<p>{username}</p>
						<div>
							{user && user.username === username && (
								<DeleteButton postId={id} />
							)}
						</div>
					</div>
				</div>

				<img src={image} alt={caption} />

				<LikeButton user={user} post={{ id, likeCount, likes }} />
				<p>Likes: {likeCount}</p>
				<div>
					<button>Add a Comment</button>
					<p>Comments: {commentCount}</p>
				</div>

				<p>{caption}</p>
				<p>{moment(createdAt).fromNow()}</p>
			</div>
		);
	}

	return postMarkup;
}
