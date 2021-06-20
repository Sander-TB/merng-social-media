import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import { FETCH_POSTS_QUERY } from "../../queries/getPosts";
import { AuthContext } from "../../context/auth";
import PostForm from "../posts/PostForm";
import LikeButton from "../buttons/LikeButton";
import DeleteButton from "../buttons/DeleteButton";

export default function Home() {
	const user = useContext(AuthContext);

	const { loading, data, error } = useQuery(FETCH_POSTS_QUERY);
	if (data) {
		console.log(data);
	}
	if (error) {
		console.log(error);
		return "error";
	}

	return (
		<main className='flex flex-col items-center justify-center'>
			{user && <PostForm />}
			<div>
				<h1>Recent Posts</h1>
			</div>
			{loading ? (
				<h1>"Loading..."</h1>
			) : (
				data.getPosts &&
				data.getPosts.map((post) => {
					return (
						<div key={post.id} className='border border-black mb-5 w-1/4'>
							<div className='flex mb-1 items-center justify-between'>
								<div className='flex items-center'>
									<img
										src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
										alt='avatar'
										className='w-10'
									/>
									<p>{post.username}</p>
								</div>

								<div>
									{user && user.user.username === post.username && (
										<DeleteButton postId={post.id} />
									)}
								</div>
							</div>

							<Link to={`/post/${post.id}`}>
								<img src={post.image} alt={post.caption} />
							</Link>

							<LikeButton user={user} post={post} />
							<p>Likes: {post.likeCount}</p>
							<div>
								<button>Add a Comment</button>
								<p>Comments: {post.commentCount}</p>
							</div>

							<p>{post.caption}</p>
							<p>{moment(post.createdAt).fromNow()}</p>
						</div>
					);
				})
			)}
		</main>
	);
}
