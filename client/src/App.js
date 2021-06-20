import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Nav from "./components/navigation/Nav";
//import SinglePost from "./components/posts/SinglePost";
import { AuthProvider } from "./context/auth";
import AuthRoute from "./utils/Authroute";

function App() {
	return (
		<AuthProvider>
			<Router>
				<Nav />
				<Switch>
					<Route exact path='/' component={Home} />
					<AuthRoute exact path='/login' component={Login} />
					<AuthRoute exact path='/register' component={Register} />
					{/*<Route exact path='/posts/:postId' component={SinglePost} />*/}
				</Switch>
			</Router>
		</AuthProvider>
	);
}

export default App;
