import { useContext } from "react";
import { Link } from "react-router-dom";
import { TiCameraOutline } from "react-icons/ti";

import { AuthContext } from "../../context/auth";

export default function Nav() {
	const { user, logout } = useContext(AuthContext);

	const menubar = user ? (
		<nav className='flex items-baseline w-full'>
			<div className='flex w-1/4'>
				<Link to='/'>
					<h1 className='font-logo text-4xl cursor-pointer'>
						<TiCameraOutline className='inline' /> Pixelgram
					</h1>
				</Link>
			</div>
			<div className='flex items-evenly w-3/4'>
				<Link to={`/users/${user.username}`} className='mr-4'>
					{user.username}
				</Link>
				<button onClick={logout} className='mr-4'>
					Log Out
				</button>
			</div>
		</nav>
	) : (
		<nav className='flex items-center w-full'>
			<div className='flex w-1/4'>
				<Link to='/'>
					<h1 className='font-logo text-4xl cursor-pointer'>
						<TiCameraOutline className='inline' /> Pixelgram
					</h1>
				</Link>
			</div>
			<div className='flex items-evenly w-3/4'>
				<Link to='/' className='mr-4'>
					Home
				</Link>
				<Link to='/login' className='mr-4'>
					Log In
				</Link>
				<Link to='/register'>Register</Link>
			</div>
		</nav>
	);

	return menubar;
}
