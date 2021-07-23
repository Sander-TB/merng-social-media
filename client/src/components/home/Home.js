import { useContext } from "react";
import { useQuery } from "@apollo/client";

import { FETCH_POSTS_QUERY } from "../../queries/getPosts";
import PostCard from "../posts/PostCard";

function Home() {
	const { loading, data } = useQuery(FETCH_POSTS_QUERY);
	return (
		<main>
			<div>
				<h1 className='text-4xl font-bold text-center mt-8'>Recent Posts</h1>
			</div>
			{loading ? (
				<h1>"Loading..."</h1>
			) : (
				data &&
				data.getPosts.map((post) => {
					return (
						<div key={post.id}>
							<PostCard post={post} />
						</div>
					);
				})
			)}
		</main>
	);
}

export default Home;
