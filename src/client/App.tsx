import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Watchlist from './components/Watchlist';
import Blogs from './components/Blogs';

// App FC creates and outlines the front end routes
// Nav component above all routes creates a Navbar that remains at the top of the page
const App: React.FC<AppProps> = props => {

	const [loggedUser, setLoggedUser] = React.useState<boolean>(false);

	const updateLoggedUser = (param: boolean) => {
		console.log(param);
		setLoggedUser(param);
	};

    return (
        <BrowserRouter>
		<Nav 
		loggedIn = {loggedUser} />
			<Switch>
				<Route exact path='/'>
					<Home />
				</Route>
				<Route exact path='/login'>
					<Login
					loginHandler = {updateLoggedUser} />
				</Route>
				<Route exact path='/register'>
					<Register />
				</Route>
				<Route exact path='/watchlist/:userid'>
					<Watchlist />
				</Route>
				<Route exact path='/blogs/:userid'>
					<Blogs />
				</Route>
			</Switch>
		</BrowserRouter>
    );
}

interface AppProps {}
// // App is exported
export default App;
