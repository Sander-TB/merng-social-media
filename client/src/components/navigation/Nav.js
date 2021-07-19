import { useContext } from "react";
import { Link } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import CameraAltOutlinedIcon from "@material-ui/icons/CameraAltOutlined";

import { AuthContext } from "../../context/auth";

export default function Nav() {
	const { user, logout } = useContext(AuthContext);

	const menubar = user ? (
		<AppBar position='static'>
			<Toolbar>
				<IconButton
					edge='start'
					color='inherit'
					aria-label='menu'
					className='logo'>
					<Link to='/'>
						<CameraAltOutlinedIcon /> Pixelgram
					</Link>
				</IconButton>
				<Typography variant='h6'>
					<Link to={`/users/${user.username}`} className=''>
						{user.username}
					</Link>
				</Typography>
				<Button variant='contained' onClick={logout} className=''>
					Log Out
				</Button>
			</Toolbar>
		</AppBar>
	) : (
		<AppBar position='static'>
			<Toolbar>
				<IconButton
					edge='start'
					color='inherit'
					aria-label='menu'
					className='logo'>
					<Link to='/'>
						<CameraAltOutlinedIcon /> Pixelgram
					</Link>
				</IconButton>
				<Typography variant='h6'>
					<Link to='/login'>
						<Button variant='contained'>Log In</Button>
					</Link>
				</Typography>
				<Link to='/register'>
					<Button variant='contained'>Register</Button>
				</Link>
			</Toolbar>
		</AppBar>
	);

	return menubar;
}
