import { useContext } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { AuthContext } from "../../context/auth";
import LikeButton from "../buttons/LikeButton";
import DeleteButton from "../buttons/DeleteButton";
import { Avatar } from "@material-ui/core";

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
			<Card>
				<CardHeader
					avatar={<Avatar />}
					title={username}
					subheader={moment(createdAt).fromNow()}
					action={
						user && user.username === username && <DeleteButton postId={id} />
					}
				/>

				<CardContent>
					<Link to={`/posts/${id}`}>
						<img src={image} alt={caption} />
					</Link>
					<Typography>
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
					</Typography>
				</CardContent>
			</Card>
			<br />
		</>
	);
}
