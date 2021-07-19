import { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../../queries/register";
import { useForm } from "../../hooks/useForm";
import { AuthContext } from "../../context/auth";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

export default function Register(props) {
	const context = useContext(AuthContext);
	const [errors, setErrors] = useState({});

	const { onChange, onSubmit, values } = useForm(registerUser, {
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const [addUser, { loading }] = useMutation(REGISTER_USER, {
		update(_, { data: { register: userData } }) {
			context.login(userData);
			props.history.push("/");
		},
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
		variables: values,
	});

	function registerUser() {
		addUser();
	}

	return (
		<Container maxWidth='xs'>
			<form onSubmit={onSubmit} className={loading ? "disabled" : ""}>
				<h1>Register</h1>
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
					label='Email'
					variant='outlined'
					placeholder='Email'
					name='email'
					value={values.email}
					error={errors.email}
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
				<TextField
					label='Confirm Password'
					variant='outlined'
					placeholder='Confirm Password'
					name='confirmPassword'
					type='password'
					value={values.confirmPassword}
					error={errors.confirmPassword}
					onChange={onChange}
				/>
				<Button variant='contained'>Register</Button>
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
