import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { User } from '../utils/api';
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

//Nav FC renders a navbar at the top of the page that allows user to switch between 'Home' and 'Compose' page views
const Nav: React.FC<NavProps> = props => {

    const [loginLink, setLoginLink] = React.useState('Login');

    React.useEffect(() => {
        console.log('nav useEffect');
        if (props.loggedIn) {
            setLoginLink('Logout');
        } else {
            setLoginLink('Login');
        };
    }, [props.loggedIn]);

    return (
        <nav className="nav d-flex shadow p-3 mb-4 justify-content-between navi-color">
            <div className="float-left">
                <NavLink className="font-weight-light mx-4" activeClassName="border-bottom border-primary font-weight-bold" to="/login">{loginLink}</NavLink>
            </div>
            <div>
                <SearchBar />
            </div>
            <div className="">
                <NavLink className="font-weight-light mx-4" activeClassName="border-bottom border-primary font-weight-bold" exact to="/">Home</NavLink>
                <NavLink className="font-weight-light mx-4" activeClassName="border-bottom border-primary font-weight-bold" exact to="/filmdb">Database</NavLink>
            </div>
        </nav>
    );
}

interface NavProps {
    loggedIn: boolean
}
// Nav is exported
export default Nav;