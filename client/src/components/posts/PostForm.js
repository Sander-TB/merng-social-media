import { useForm } from "../../hooks/useForm";
import { CREATE_POST_MUTATION } from "../../queries/createPost";
import { FETCH_POSTS_QUERY } from "../../queries/getPosts";
import { useMutation } from "@apollo/client";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

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
		<Paper>
			<form onSubmit={onSubmit}>
				<Typography variant='display1' align='center' gutterBottom>
					Create a post
				</Typography>

				<TextField
					label='Image'
					variant='outlined'
					name='image'
					type='text'
					placeholder='Image'
					onChange={onChange}
					value={values.image}
				/>
				<TextField
					label='Caption'
					variant='outlined'
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
				<Button variant='contained'>Submit</Button>
			</form>
		</Paper>
	);
}
