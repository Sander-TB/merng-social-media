import { useContext } from "react";
import { Link } from "react-router-dom";
import { IoCameraOutline } from "react-icons/io5";

import { AuthContext } from "../../context/auth";
import LoginButton from "../buttons/LoginButton";
import RegisterButton from "../buttons/RegisterButton";

export default function Nav() {
	const { user, logout } = useContext(AuthContext);

	const menubar = user ? (
		<nav className='py-5 bg-blue-500'>
			<div className='flex flex-row justify-between items-center mx-auto max-w-md'>
				<Link to='/'>
					<div className='flex flex-row text-3xl'>
						<IoCameraOutline className='inline mt-1 mr-1' />
						<p className='font-logo'>Pixelgram</p>
					</div>
				</Link>
				<p className='font-bold underline'>
					<Link to={`/users/${user.username}`} className=''>
						{user.username}
					</Link>
				</p>
				<button onClick={logout} className='bg-red-400 rounded-sm px-3 py-1'>
					Log Out
				</button>
			</div>
		</nav>
	) : (
		<nav className='py-5 bg-blue-500'>
			<div className='flex flex-row justify-between items-center mx-auto max-w-md'>
				<Link to='/register'>
					<div className='flex flex-row text-3xl'>
						<IoCameraOutline className='inline' />
						<p className='font-logo'>Pixelgram</p>
					</div>
				</Link>

				<div>
					<LoginButton />
					<RegisterButton />
				</div>
			</div>
		</nav>
	);

	return menubar;
}
