import { useQuery } from "@apollo/client";
import moment from "moment";
import { useContext } from "react";

import { AuthContext } from "../../context/auth";
import { FETCH_POST_QUERY } from "../../queries/getOnePost";
import LikeButton from "../buttons/LikeButton";
import DeleteButton from "../buttons/DeleteButton";

function SinglePost(props) {
	const postId = props.match.params.postId;
	const { user } = useContext(AuthContext);
	const { data } = useQuery(FETCH_POST_QUERY, {
		variables: {
			postId,
		},
	});

	function deletePostCallback() {
		props.history.push("/");
	}

	let postMarkup;
	if (!data) {
		postMarkup = <p>Loading post...</p>;
	} else {
		const {
			id = data.getPost.id,
			image = data.getPost.image,
			caption = data.getPost.caption,
			createdAt = data.getPost.createdAt,
			username = data.getPost.username,
			comments = data.getPost.comments,
			likes = data.getPost.likes,
			commentCount = data.getPost.commentCount,
			likeCount = data.getPost.likeCount,
		} = data;

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
								<DeleteButton postId={id} callback={deletePostCallback} />
							)}
						</div>
					</div>
				</div>

				<img src={image} alt={caption} />
				<p>{caption}</p>

				<LikeButton user={user} post={{ id, likes, likeCount }} />
				<p>Likes: {likeCount}</p>
				<div>
					<p>Comments: {commentCount}</p>
					<p>{comments}</p>
					<button>Add a Comment</button>
				</div>

				<p>{moment(createdAt).fromNow()}</p>
			</div>
		);
	}
	return postMarkup;
}

export default SinglePost;
