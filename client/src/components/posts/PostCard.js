import { useContext } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { IoPersonCircle, IoChatbubbleOutline } from "react-icons/io5";

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
			<main className='max-w-md mx-auto shadow-lg my-10 rounded-md'>
				<header className='flex flex-row justify-between items-center py-2 bg-white rounded-md'>
					<IoPersonCircle className='text-5xl text-gray-400' />
					<p className='text-2xl font-bold'>{username}</p>
					<p className='text-gray-400 text-xs'>{moment(createdAt).fromNow()}</p>
					<div>
						{user && user.username === username && <DeleteButton postId={id} />}
					</div>
				</header>

				<div className='flex flex-col'>
					<Link to={`/posts/${id}`}>
						<img src={image} alt={caption} />
					</Link>
					<div className='flex flex-col px-2 py-3 bg-white rounded-b-md'>
						<div className='flex text-4xl mb-5'>
							<LikeButton user={user} post={{ id, likes, likeCount }} />
							<Link to={`/posts/${id}`}>
								<IoChatbubbleOutline className='ml-2' />
							</Link>
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
					</div>
				</div>
			</main>
		</>
	);
}
