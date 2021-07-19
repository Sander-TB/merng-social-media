import { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../queries/login";
import { useForm } from "../../hooks/useForm";
import { AuthContext } from "../../context/auth";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

export default function Login(props) {
	const context = useContext(AuthContext);
	const [errors, setErrors] = useState({});

	const { onChange, onSubmit, values } = useForm(loginUserCallback, {
		username: "",
		password: "",
	});

	const [loginUser, { loading }] = useMutation(LOGIN_USER, {
		update(_, { data: { login: userData } }) {
			console.log(userData);
			context.login(userData);
			props.history.push("/");
		},
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
		variables: values,
	});

	function loginUserCallback() {
		loginUser();
	}

	return (
		<Container maxWidth='xs'>
			<form onSubmit={onSubmit} className={loading ? "disabled" : ""}>
				<h1>Log In</h1>
				<TextField
					label='Username'
					variant='outlined'
					placeholder='Username'
					name='username'
					value={values.username}
					error={errors.username}
					onChange={onChange}
				/>
				<TextField
					label='Password'
					variant='outlined'
					placeholder='Password'
					name='password'
					type='password'
					value={values.password}
					error={errors.password}
					onChange={onChange}
				/>
				<button variant='contained'>Log In</button>
				{Object.keys(errors).length > 0 && (
					<div className='errors'>
						{Object.values(errors).map((value) => (
							<p key={value}>{value}</p>
						))}
					</div>
				)}
			</form>
		</Container>
	);
}
