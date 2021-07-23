import { Link } from "react-router-dom";

export default function LoginButton() {
	return (
		<Link to='/login'>
			<button className='bg-blue-900 px-3 py-1 mr-2 rounded-sm text-blue-100'>
				Log In
			</button>
		</Link>
	);
}
