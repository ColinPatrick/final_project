import * as React from 'react';
import { json, SetAccessToken, User } from '../utils/api';
import { Link } from 'react-router-dom';
import { RouteComponentProps, withRouter } from 'react-router-dom';

const Login: React.FC<LoginProps> = props => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [token, setToken] = React.useState('');
    const [logoutScreen, setLogoutScreen] = React.useState(false);

    React.useEffect(() => {
        if(User.userid !== null) {
            setLogoutScreen(true);
        }
    }, []);

    const handleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            let result = await json('/auth/login', 'POST', {
                email: email,
                password: password
            });

            if(result) {
                SetAccessToken(result.token, { userid: result.userid, role: result.role });
                const token = localStorage.getItem('token');
                setToken(token);
                props.loginHandler(true);
                props.history.push('/');               
            } else {
                alert('The email or password you have entered does not match any of our registered users.');               
            };

        } catch(e) {
            console.log(e);
            throw(e);
        };
    };

    const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const res = await fetch(`/api/token/${User.userid}`, {
                method: 'DELETE'
        });
        setToken('');
        localStorage.clear();
        props.loginHandler(false);
        props.history.push('/');
        location.reload();
    };

    if(logoutScreen == false) {
        return (
            <main className="container">
                <section className="row d-flex justify-content-center">
                    <div className="col-md-12 d-flex justify-content-center">
                        <h2 className="text-center text-dark">Sign In:</h2>
                    </div>
                    <div className="col-md-6 d-flex justify-content-center">
                        <form className="form-group p-3">
                            <label htmlFor="email" className=" text-dark my-2">Email</label>
                            <input type="text" value={email} className="form-control form-control-lg my-2" id="email-input" onChange={e => setEmail(e.target.value)} />
                            <label htmlFor="email" className="text-dark my-2">Password</label>
                            <input type="password" value={password} className="form-control form-control-lg my-2" id="pass-input" onChange={e => setPassword(e.target.value)} />
                            <div className="col-md-12 d-flex justify-content-end">
                                <button className="btn btn-primary my-3" onClick={ handleSignIn }>Sign In</button>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-12 mb-4">
                        <hr className="divide-line text-dark" />
                    </div>
                    <div className="col-md-12 d-flex justify-content-center">
                        <h6 className="mb-3 text-dark">No account?</h6>
                    </div>
                    <div className="col-md-12 d-flex justify-content-center mt-1 mb-5">
                        <Link className="text-primary" to="/register">Create one today!</Link>
                    </div>
                </section>
            </main>
        );
    } else {
        return (
            <main className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-12 d-flex justify-content-center m-3">
                        <h4 className="primary text-dark">Are you sure you want to sign out?</h4>
                    </div>
                    <div className="col-md-12 d-flex justify-content-center m-4">
                        <button className="btn btn-primary rounded text-white" onClick={ handleSignOut }>Sign Out</button>
                    </div>
                </div>
            </main>
        );
    };
};

interface LoginProps extends RouteComponentProps {
    loginHandler: any
};

export default withRouter (Login);