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
			<div className=''>
				<div className=''>
					<img
						src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
						alt='avatar'
					/>
					<p>{username}</p>
				</div>

				<div>
					{user && user.username === username && <DeleteButton postId={id} />}
				</div>
			</div>

			<Link to={`/posts/${id}`}>
				<img src={image} alt={caption} />
			</Link>

			<LikeButton user={user} post={{ id, likes, likeCount }} />
			<p>Likes: {likeCount}</p>
			<p>
				Liked by:{" "}
				{likes.map((like) => {
					if (likes.length < 2) {
						return like.username;
					} else {
						return like.username + ", ";
					}
				})}
			</p>
			<div>
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

			<p>{caption}</p>
			<p>{moment(createdAt).fromNow()}</p>
		</>
	);
}
