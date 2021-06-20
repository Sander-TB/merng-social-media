import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { FETCH_POSTS_QUERY } from "../../queries/getPosts";
import moment from "moment";
import { IoHeartOutline } from "react-icons/io5";
import { AuthContext } from "../../context/auth";
import PostForm from "../posts/PostForm";

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

	function likePost() {
		console.log("Like post!");
	}
	function commentPost() {
		console.log("Comment post!");
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
							{/*	<Link to={`/posts/${post.id}`}>*/}
							<div className='flex mb-1 items-center'>
								<img
									src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
									alt='avatar'
									className='w-10'
								/>
								<p>{post.username}</p>
							</div>
							<img src={post.image} alt={post.caption} />
							<div className='flex'>
								<button onClick={likePost} className='cursor-pointer'>
									<IoHeartOutline />
								</button>
								<p>Likes: {post.likeCount}</p>
							</div>
							<div>
								<button onClick={commentPost}>Add a Comment</button>
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
