import * as React from 'react';
import * as Bootstrap from 'bootstrap';

const Profile: React.FC<ProfileProps> = props => {
    React.useEffect(() => console.log(localStorage), []);

    return (

        <main className="container">
            <section className="Jumbotron fluid true">
                <div className="col-12">
                    <h1 className="display-1 text-center">Profile Page!</h1>
                </div>
                <div className="d-flex justify-content-between navi-color">
                    <button className="outline-primary">Watchlist</button>{' '}
                    <button className="outline-primary">Blogs</button>{' '}
                    <button className="outline-primary">Ratings</button>{' '}
                </div>
            </section>
        </main>
    )

}

interface ProfileProps { }

export default Profile;