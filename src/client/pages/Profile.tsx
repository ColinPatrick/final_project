import * as React from 'react';
import * as Bootstrap from 'bootstrap';
import './PagesStyles';

const Profile: React.FC<ProfileProps> = props => {
    React.useEffect(() => console.log(localStorage), []);

    const pic = 'https://images.unsplash.com/photo-1612392062335-300bb9bd3054?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80';

    return (
        <main className="container">
            <section className="Jumbotron fluid">
                <div className="col-12">
                    <h1 className="display-1 text-center">Profile Page!</h1>
                </div>
            </section>

            {/* div for all the cards */}
            <div className="d-flex justify-content-between navi-color">
                {/* WATCHLIST CARD */}
                <div className="card">
                    <h5 className='card-header'>Watchlist</h5>
                    <img id='Dune'
                    className="card-img-top" 
                    src={pic} 
                    alt="img-thumbnail" />

                    <div className="card-body">
                        <a href="#" className='btn btn-primary'>Go To Watchlist</a>
                    </div>
                </div>

                {/* BLOGS CARD */}
                <div className="card">
                    <h5 className='card-header'>Blogs</h5>
                    <div className="card-body">
                        {/* should display the first...50(?) characters of the blog */}
                        <h5>Lorem Ipsum</h5>
                        <a href="#" className='btn btn-primary'>Go To Blogs</a>
                    </div>
                </div>

                {/* REVIEWS CARD */}
                <div className="card">
                    <h5 className='card-header'>Reviews</h5>
                    <img id='Dune'
                    className="card-img-top" 
                    src={pic} 
                    alt="img-thumbnail" />
                    <div className="card-body">
                        <a href="#" className='btn btn-primary'>Go To Reviews</a>
                    </div>
                </div>

                {/* RATINGS CARD */}
                <div className="card">
                    <h5 className='card-header'>Ratings</h5>
                    <img id='Dune'
                    className="card-img-top" 
                    src={pic} 
                    alt="img-thumbnail" />
                    <div className="card-body">
                        <a href="#" className='btn btn-primary'>Go To Ratings</a>
                    </div>
                </div>
            </div>
        </main>
    )

}

interface ProfileProps { }

export default Profile;