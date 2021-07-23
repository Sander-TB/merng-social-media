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
		<form onSubmit={onSubmit}>
			<h1>Create a post</h1>

			<input
				name='image'
				type='text'
				placeholder='Image'
				onChange={onChange}
				value={values.image}
			/>
			<input
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
			<button>Submit</button>
		</form>
	);
}
