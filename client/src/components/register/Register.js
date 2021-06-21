import { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../../queries/register";
import { useForm } from "../../hooks/useForm";
import { AuthContext } from "../../context/auth";

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
		<main className='flex flex-col items-center justify-center mx-auto'>
			<form
				onSubmit={onSubmit}
				className={loading ? "disabled flex flex-col" : "flex flex-col"}>
				<h1>Register</h1>
				<input
					placeholder='Username'
					name='username'
					className='border border-black mb-2'
					value={values.username}
					error={errors.username}
					onChange={onChange}
				/>
				<input
					placeholder='Email'
					name='email'
					className='border border-black mb-2'
					value={values.email}
					error={errors.email}
					onChange={onChange}
				/>
				<input
					placeholder='Password'
					name='password'
					type='password'
					className='border border-black mb-2'
					value={values.password}
					error={errors.password}
					onChange={onChange}
				/>
				<input
					placeholder='Confirm Password'
					name='confirmPassword'
					type='password'
					className='border border-black mb-2'
					value={values.confirmPassword}
					error={errors.confirmPassword}
					onChange={onChange}
				/>
				<button className='border border-black'>Register</button>
				{Object.keys(errors).length > 0 && (
					<div className='errors flex flex-col'>
						{Object.values(errors).map((value) => (
							<p key={value}>{value}</p>
						))}
					</div>
				)}
			</form>
		</main>
	);
}
