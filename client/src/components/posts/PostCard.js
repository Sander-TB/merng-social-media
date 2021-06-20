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
		likes,
	},
}) {
	const { user } = useContext(AuthContext);

	return (
		<>
			<div className='flex mb-1 items-center justify-between'>
				<div className='flex items-center'>
					<img
						src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
						alt='avatar'
						className='w-10'
					/>
					<p>{username}</p>
				</div>

				<div>
					{user && user.username === username && <DeleteButton postId={id} />}
				</div>
			</div>

			<Link to={`/post/${id}`}>
				<img src={image} alt={caption} />
			</Link>

			<LikeButton user={user} post={{ id, likes, likeCount }} />
			<p>Likes: {likeCount}</p>
			<div>
				<button>Add a Comment</button>
				<p>Comments: {commentCount}</p>
			</div>

			<p>{caption}</p>
			<p>{moment(createdAt).fromNow()}</p>
		</>
	);
}
