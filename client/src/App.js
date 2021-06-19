import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Nav from "./components/navigation/Nav";
import SinglePost from "./components/posts/Post";

function App() {
	return (
		<Router>
			<Nav />
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/login' component={Login} />
				<Route exact path='/register' component={Register} />
				<Route exact path='/posts/:postId' component={SinglePost} />
			</Switch>
		</Router>
	);
}

export default App;
