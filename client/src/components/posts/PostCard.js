import { useContext } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import { AuthContext } from "../../context/auth";
import LikeButton from "../buttons/LikeButton";
import DeleteButton from "../buttons/DeleteButton";

export default function PostCard({
	post: {
		image,
		caption,
		createdAt,
		id,
		username,
		likeCount,
		commentCount,
		comments,
		likes,
	},
}) {
	const { user } = useContext(AuthContext);
	return (
		<>
			<br />
			<div>
				<div>
					<img
						src='https://lh3.googleusercontent.com/proxy/2ZR1AupC5F5XUmKFfFkIS0C7hXxhGFtFeTQ1YB4JA7o8xxj-H0CKP3PlZYmiDAO_wMQ_BUoUmdqrs6hn3unasFIrhr7rTghM-GkUCnB64mRKdTB5nfBctY5QYCtpXASP0iAgq_DZD7zgIkBVXeLxsQ96SYJC'
						alt={username}
					/>
					<p>{username}</p>
					{user && user.username === username && <DeleteButton postId={id} />}
				</div>

				<div>
					<Link to={`/posts/${id}`}>
						<img src={image} alt={caption} />
					</Link>
					<div>
						<p>{caption}</p>

						<br />
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

						<br />
						<p>
							{comments.map((comment) => (
								<div key={comment.id}>
									{user && user.username === comment.username && (
										<DeleteButton postId={id} commentId={comment.id} />
									)}
									<p>{comment.username}</p>
									<p>{comment.body}</p>
									<p>{moment(comment.createdAt).fromNow()}</p>
								</div>
							))}
						</p>
					</div>
				</div>
			</div>
			<br />
		</>
	);
}
