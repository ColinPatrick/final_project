import * as React from 'react';
import * as Bootstrap from 'bootstrap';
import './PagesStyles';
import { Link, useParams } from 'react-router-dom'
import BlogPreview from '../components/BlogPreview'
import Reviews from '../components/Reviews'

const Profile: React.FC<ProfileProps> = (props) => {
    const { userid } = useParams()
    const [user, setUser] = React.useState({})
    const [blogs, setBlogs] = React.useState([])

    const getUser = async (req, res) => {
        try {
            let res = await fetch(`/api/user/${userid}`)
            let user = await res.json()

            setUser(user)

        } catch (error) {
            console.error(error)
        }
    }
    const getBlogs = async (req, res) => {
        try {
            let res = await fetch(`/api/blogs/${userid}`)
            let blogs = await res.json()

            setBlogs(blogs)

        } catch (error) {
            console.error(error)
        }

    }

    React.useEffect(() => {
        (async (req, res) => {
            getUser(req, res)
            getBlogs(req, res)
        })()
    }, []);

    const pic = 'https://images.unsplash.com/photo-1612392062335-300bb9bd3054?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80';

    return (
        <main className="container">
            <section className="Jumbotron fluid">
                <div className="col-12">
                    <h1 className="display-1 text-center">Hello, {user?.username}!</h1>
                </div>
            </section>

            {/* div for all the cards */}
            <div className="d-flex justify-content-between navi-color">
                {/* WATCHLIST CARD */}
                <div className="card">
                    <h5 className='card-header text-center'>Watchlist</h5>
                    {/* img should display a random thumbnail of a movie in the watchlist */}
                    <img id='Dune'
                        className="card-img-top"
                        src={pic}
                        alt="img-thumbnail" />

                    <div className="card-body">
                        <Link to="/watchlist" className='btn btn-outline-primary'>Go To Watchlist</Link>
                    </div>
                </div>


                {/* REVIEWS CARD */}
                {/* <div className="card">
                    <h5 className='card-header text-center'>Reviews</h5>
                    <img id='Dune'
                        className="card-img-top"
                        src={pic}
                        alt="img-thumbnail" />
                    {Reviews.map(Review =>
                        <ReviewPreview key={`review-preview-${reviews.id}`} />
                    )}
                    <div className="card-body">
                        <Link to="/reviews" className='btn btn-outline-primary'>Go To reviews</Link>
                    </div>
                </div> */}

                {/* Logs CARD */}
                <div className="card">
                    <h5 className='card-header text-center'>Logs</h5>
                    <img id='Dune'
                        className="card-img-top"
                        src={pic}
                        alt="img-thumbnail" />
                    <div className="card-body">
                        <Link to="/logs" className='btn btn-outline-primary'>Go To Logs</Link>
                    </div>
                </div>
            </div>

            {/* BLOGS CARD */}
            <div className="row-12">

                {/* should display the first...50ish characters of the blog */}
                {/* <h5>Lorem Ipsum</h5> */}
                {blogs.map(blog =>
                    <BlogPreview key={`blog-preview-${blogs.id}`} blog={blog} />
                )}
                <Link to="/Blogs" className='btn btn-outline-primary'>Go To Blogs</Link>

            </div>

        </main>
    )

}

interface ProfileProps {
    username: string
}

export default Profile;