import { IoHeartOutline, IoHeart } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";

import { LIKE_POST_MUTATION } from "../../queries/likePost";

function LikeButton({ user, post: { id, likes } }) {
	const [liked, setLiked] = useState(false);

	useEffect(() => {
		if (user && likes.find((like) => like.username === user.username)) {
			setLiked(true);
		} else setLiked(false);
	}, [user, likes]);

	const [likePost] = useMutation(LIKE_POST_MUTATION, {
		variables: { postId: id },
	});

	const likeButton = user ? (
		liked ? (
			<div>
				<IoHeart />
			</div>
		) : (
			<div>
				<IoHeartOutline />
			</div>
		)
	) : (
		<Link to='/login'>
			<IoHeartOutline />
		</Link>
	);

	return (
		<div className='flex'>
			<button onClick={likePost} className='cursor-pointer'>
				{likeButton}
			</button>
		</div>
	);
}

export default LikeButton;
