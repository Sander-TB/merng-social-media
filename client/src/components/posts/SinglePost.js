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
			<>
				<br />
				<div key={id}>
					<div className>
						<div>
							<img
								src='https://lh3.googleusercontent.com/proxy/2ZR1AupC5F5XUmKFfFkIS0C7hXxhGFtFeTQ1YB4JA7o8xxj-H0CKP3PlZYmiDAO_wMQ_BUoUmdqrs6hn3unasFIrhr7rTghM-GkUCnB64mRKdTB5nfBctY5QYCtpXASP0iAgq_DZD7zgIkBVXeLxsQ96SYJC'
								alt={username}
							/>
							<p>{username}</p>
							<p>{moment(createdAt).fromNow()}</p>
							{user && user.username === username && (
								<DeleteButton postId={id} />
							)}
						</div>

						<div>
							<img src={image} alt={caption} />
							<div>
								<p>{caption}</p>
								<LikeButton user={user} post={{ id, likes, likeCount }} />
								<p>Likes: {likeCount}</p>
								<p>
									Liked by:
									{likes.map((like) => {
										if (likes.length < 2) {
											return like.username;
										} else {
											return like.username + ", ";
										}
									})}
								</p>
								<div>
									<p>Comments: {commentCount}</p>
									{comments.map((comment) => (
										<div key={comment.id}>
											{(user && user.username === comment.username) ||
												(user.username === username && (
													<DeleteButton postId={id} commentId={comment.id} />
												))}
											<p>{comment.username}</p>
											<p>{comment.body}</p>
											<p>{moment(comment.createdAt).fromNow()}</p>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
	return postMarkup;
}

export default SinglePost;
