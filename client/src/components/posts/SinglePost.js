import { useQuery, useMutation } from "@apollo/client";
import moment from "moment";
import { useContext, useState, useRef } from "react";
import { IoPersonCircle } from "react-icons/io5";

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
			<main className='max-w-md mx-auto my-10 shadow-lg rounded-md'>
				<div key={id}>
					<header className='flex flex-row justify-between items-center py-2 bg-white rounded-t-md'>
						<IoPersonCircle className='text-5xl text-gray-400' />
						<p className='text-2xl font-bold'>{username}</p>
						<p className='text-gray-400 text-xs'>
							{moment(createdAt).fromNow()}
						</p>
						<div>
							{user && user.username === username && (
								<DeleteButton postId={id} />
							)}
						</div>
					</header>

					<div className='flex flex-col'>
						<img src={image} alt={caption} />
						<div className='flex flex-col px-2 py-3 bg-white rounded-b-md'>
							<div className='mb-5 text-4xl'>
								<LikeButton user={user} post={{ id, likes, likeCount }} />
							</div>
							<div>
								<p>
									{likeCount} likes, {commentCount} comments
								</p>
							</div>
							<div className='flex'>
								<p className='font-bold'>{username}:</p>
								<p className='ml-1'>{caption}</p>
							</div>

							<div>
								{comments.map((comment) => (
									<div key={comment.id} className='flex items-center'>
										<p className='font-bold'>{comment.username}: </p>
										<p className='ml-2 mr-3'>{comment.body}</p>
										<p className='text-gray-400 text-xs'>
											{moment(comment.createdAt).fromNow()}
										</p>
										<p className='mb-3'>
											{user && user.username === comment.username && (
												<DeleteButton postId={id} commentId={comment.id} />
											)}
										</p>
									</div>
								))}
							</div>
							<div>
								{user && (
									<div className='mt-5'>
										<form>
											<input
												className='border px-1 rounded-l-sm'
												type='text'
												name='postComment'
												placeholder='Post A Comment'
												value={comment}
												onChange={(e) => setComment(e.target.value)}
											/>
											<button
												onClick={submitComment}
												type='submit'
												className='px-3 rounded-r-sm bg-blue-400 border border-blue-400'>
												Post
											</button>
										</form>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</main>
		);
	}
	return postMarkup;
}

export default SinglePost;
