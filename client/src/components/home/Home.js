import { useContext } from "react";
import { useQuery } from "@apollo/client";

import { FETCH_POSTS_QUERY } from "../../queries/getPosts";
import { AuthContext } from "../../context/auth";
import PostForm from "../posts/PostForm";
import PostCard from "../posts/PostCard";

function Home() {
	const { user } = useContext(AuthContext);

	const { loading, data } = useQuery(FETCH_POSTS_QUERY);

	if (data) {
		console.log(data);
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
				data &&
				data.getPosts.map((post) => {
					return (
						<div key={post.id} className='border border-black mb-5 w-1/4'>
							<PostCard post={post} />
						</div>
					);
				})
			)}
		</main>
	);
}

export default Home;
