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
		<form onSubmit={onSubmit} className='flex flex-col mb-20'>
			<h2>Create a post</h2>
			<input
				name='image'
				type='file'
				onChange={onChange}
				value={values.image}
				className='mb-2'
			/>
			<input
				placeholder='caption'
				name='caption'
				onChange={onChange}
				value={values.caption}
				className='border border-black mb-2'
			/>
			{error && (
				<div className='errors'>
					<p>{error.graphQLErrors[0].message}</p>
				</div>
			)}
			<button className='border border-black'>Submit</button>
		</form>
	);
}
