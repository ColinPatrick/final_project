import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { User } from '../utils/api';
import SearchBar from "./SearchBar";

//Nav FC renders a navbar at the top of the page that allows user to switch between 'Home' and 'Compose' page views
const Nav: React.FC<NavProps> = props => {

    return (
        <nav className="nav d-flex shadow p-3 mb-4 justify-content-between navi-color">
            <div className="float-left">
                {!User.userid &&
                    <NavLink className="font-weight-light mx-4" activeClassName="border-bottom border-primary font-weight-bold" to="/login">Login</NavLink>
                }
                {User.userid &&
                    <NavLink className="font-weight-light mx-4" activeClassName="border-bottom border-primary font-weight-bold" to="/login">Logout</NavLink>
                }
            </div>
            <div className="d-flex flex-row">
            {User.userid &&
                <NavLink className="font-weight-light mx-4" activeClassName="border-bottom border-primary font-weight-bold" exact to={`/profile/${User.userid}`}>Profile</NavLink>            
            }
                <NavLink className="font-weight-light mx-4" activeClassName="border-bottom border-primary font-weight-bold" exact to="/">Home</NavLink>
                <NavLink className="font-weight-light mx-4" activeClassName="border-bottom border-primary font-weight-bold" exact to="/filmdb">Database</NavLink>
                <SearchBar />
            </div>
        </nav>
    );
};

interface NavProps {
    loggedIn: boolean
};
// Nav is exported
export default Nav;