import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

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
				<FavoriteIcon />
			</div>
		) : (
			<div>
				<FavoriteBorderIcon />
			</div>
		)
	) : (
		<Link to='/login'>
			<FavoriteBorderIcon />
		</Link>
	);

	return (
		<div className='flex'>
			<IconButton onClick={likePost}>{likeButton}</IconButton>
		</div>
	);
}

export default LikeButton;
