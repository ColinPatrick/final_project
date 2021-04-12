import * as React from 'react';
import { BrowserRouter, Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import FilmDB from './pages/FilmDB';
import FilmDeets from './pages/FilmDeets';
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import Profile from './pages/Profile';
import Blogs from './pages/Blogs';

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
		<SearchBar />
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
				<Route exact path='/filmdb'>
					<FilmDB />
				</Route>
				<Route exact path='/film/:filmid'>
					<FilmDeets />
				</Route>
				<Route exact path={`/search/:searchTerm`}>
					<SearchResults />
				</Route>
				<Route exact path='/profile/:userid'>
					<Profile />
				</Route>
				<Route exact path='/profile/:userid/blogs'>
					<Blogs />
				</Route>
			</Switch>
		</BrowserRouter>
    );
}

interface AppProps {}
// // App is exported
export default App;
