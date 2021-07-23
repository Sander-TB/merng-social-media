import { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../queries/login";
import { useForm } from "../../hooks/useForm";
import { AuthContext } from "../../context/auth";

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
		<div>
			<form onSubmit={onSubmit} className={loading ? "disabled" : ""}>
				<h1>Log In</h1>
				<input
					placeholder='Username'
					name='username'
					value={values.username}
					error={errors.username}
					onChange={onChange}
				/>
				<input
					placeholder='Password'
					name='password'
					type='password'
					value={values.password}
					error={errors.password}
					onChange={onChange}
				/>
				<button className='border'>Log In</button>
				{Object.keys(errors).length > 0 && (
					<div className='errors'>
						{Object.values(errors).map((value) => (
							<p key={value}>{value}</p>
						))}
					</div>
				)}
			</form>
		</div>
	);
}
