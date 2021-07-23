import { useForm } from "../../hooks/useForm";
import { CREATE_POST_MUTATION } from "../../queries/createPost";
import { FETCH_POSTS_QUERY } from "../../queries/getPosts";
import { useMutation } from "@apollo/client";

export default function PostForm() {
	const { values, onChange, onSubmit } = useForm(createPostCallback, {
		image: "",
		caption: "",
	});

	const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
		variables: values,
		update(proxy, result) {
			console.log(result);
			const data = proxy.readQuery({
				query: FETCH_POSTS_QUERY,
			});
			proxy.writeQuery({
				query: FETCH_POSTS_QUERY,
				data: {
					getPosts: [result.data.createPost, ...data.getPosts],
				},
			});
			values.image = "";
			values.caption = "";
		},
	});

	function createPostCallback() {
		createPost();
	}

	return (
		<main className='my-5 max-w-md mx-auto'>
			<h1 className='text-4xl text-center font-bold'>Create a post</h1>
			<form
				onSubmit={onSubmit}
				className='flex flex-col items-center border border-black my-10 shadow rounded-md bg-white'>
				<input
					className='bg-gray-300 w-1/2 mb-2 mt-10 p-2 rounded-sm'
					name='image'
					type='text'
					placeholder='Image'
					onChange={onChange}
					value={values.image}
				/>
				<input
					className='bg-gray-300 w-1/2 mb-2 p-2 rounded-sm'
					placeholder='caption'
					name='caption'
					onChange={onChange}
					value={values.caption}
				/>
				{error && (
					<div className='errors'>
						<p>{error.graphQLErrors[0].message}</p>
					</div>
				)}
				<button className='px-1 ml-1 w-1/2 mb-10 p-2 rounded-sm bg-blue-400'>
					Submit
				</button>
			</form>
		</main>
	);
}
