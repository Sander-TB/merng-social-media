import { useQuery, useMutation } from "@apollo/client";
import moment from "moment";
import { useContext, useState, useRef } from "react";

import { AuthContext } from "../../context/auth";
import { FETCH_POST_QUERY } from "../../queries/getOnePost";
import LikeButton from "../buttons/LikeButton";
import DeleteButton from "../buttons/DeleteButton";
import { SUBMIT_COMMENT_MUTATION } from "../../queries/createComment";

function SinglePost(props) {
	const postId = props.match.params.postId;
	const { user } = useContext(AuthContext);
	const commentInputRef = useRef(null);

	const [comment, setComment] = useState("");

	const { data } = useQuery(FETCH_POST_QUERY, {
		variables: {
			postId,
		},
	});

	const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
		update() {
			setComment("");
			commentInputRef.current.blur();
		},
		variables: {
			postId,
			body: comment,
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
					{user && (
						<div>
							<p>Post a comment</p>
							<form>
								<input
									className='focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-300'
									placeholder='comment..'
									type='text'
									name='comment'
									value={comment}
									onChange={(e) => setComment(e.target.value)}
									ref={commentInputRef}
								/>
								<button
									type='submit'
									className='border border-black bg-blue-300 disabled:bg-blue-100 disabled:cursor-not-allowed'
									disabled={comment.trim() === ""}
									onClick={submitComment}>
									Submit
								</button>
							</form>
						</div>
					)}
					{comments.map((comment) => (
						<div key={comment.id}>
							{user && user.username === comment.username && (
								<DeleteButton postId={id} commentId={comment.id} />
							)}
							<p>{comment.username}</p>
							<p>{moment(comment.createdAt).fromNow()}</p>
							<p>{comment.body}</p>
						</div>
					))}
				</div>

				<p>{moment(createdAt).fromNow()}</p>
			</div>
		);
	}
	return postMarkup;
}

export default SinglePost;
