import { useContext } from "react";
import { Link } from "react-router-dom";
import { IoCameraOutline } from "react-icons/io5";

import { AuthContext } from "../../context/auth";

export default function Nav() {
	const { user, logout } = useContext(AuthContext);

	const menubar = user ? (
		<nav>
			<Link to='/'>
				<IoCameraOutline />
				Pixelgram
			</Link>
			<p>
				<Link to={`/users/${user.username}`} className=''>
					{user.username}
				</Link>
			</p>
			<button onClick={logout} className=''>
				Log Out
			</button>
		</nav>
	) : (
		<nav position='static'>
			<Link to='/'>Pixelgram</Link>

			<Link to='/login'>
				<button>Log In</button>
			</Link>
			<Link to='/register'>
				<button>Register</button>
			</Link>
		</nav>
	);

	return menubar;
}
