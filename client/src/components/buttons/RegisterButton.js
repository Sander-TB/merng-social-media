import { Link } from "react-router-dom";

export default function RegisterButton() {
	return (
		<Link to='/register'>
			<button className='bg-pink-500 px-3 py-1 text-blue-100 rounded-sm'>
				Register
			</button>
		</Link>
	);
}
