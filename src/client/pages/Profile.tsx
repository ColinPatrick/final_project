import * as React from 'react';
import * as Bootstrap from 'bootstrap';
import './PagesStyles';
import { Link, useParams } from 'react-router-dom'
import BlogPreview from '../components/BlogPreview'
import ReviewPreview from '../components/ReviewPreview'
//import Reviews from '../components/Reviews'

const Profile: React.FC<ProfileProps> = (props) => {
    const { userid } = useParams<{ userid: string }>()
    const [user, setUser] = React.useState({})
    const [mostRecentBlog, setMostRecentBlog] = React.useState<{ id: string }>({ id: "" })
    const [mostRecentReview, setMostRecentReview] = React.useState<{ id: string }>({ id: "" })
    const pic = 'https://images.unsplash.com/photo-1612392062335-300bb9bd3054?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80';

    const getUser = async (req, res) => {
        try {
            let res = await fetch(`/api/user/${userid}`)
            let user = await res.json()

            setUser(user)

        } catch (error) {
            console.error(error)
        }
    }

    const getMostRecentBlog = async (req, res) => {
        try {
            let res = await fetch(`/api/blogs/${userid}`)
            let allUserBlogs = await res.json()
            let mostRecentBlog = allUserBlogs[0]
            setMostRecentBlog(mostRecentBlog)
            console.log(mostRecentBlog)

        } catch (error) {
            console.error(error)
        }

    }

    const getMostRecentReview = async (req, res) => {
        try {
            let res = await fetch(`/api/reviews/${userid}`)
            let allUserReviews = await res.json()
            let mostRecentReview = allUserReviews[0]
            setMostRecentReview(mostRecentReview)
            console.log(mostRecentReview)

        } catch (error) {
            console.error(error)
        }

    }

    React.useEffect(() => {
        (async (req, res) => {
            getUser(req, res)
            getMostRecentBlog(req, res)
        })()
    }, []);

    React.useEffect(() => {
        (async (req, res) => {
            getUser(req, res)
            getMostRecentReview(req, res)
        })()
    }, []);

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

            {/* REVIEWS CARD */}
            <div className="row-12">
                <ReviewPreview key={`review-preview-${mostRecentReview.id}`} mostRecentReview={mostRecentReview} />
            </div>

            {/* BLOGS CARD */}
            <div className="row-12">
                <BlogPreview key={`blog-preview-${mostRecentBlog.id}`} mostRecentBlog={mostRecentBlog} />
            </div>

        </main>
    )

}

interface ProfileProps {
    username: string,
    userid: number,
    id: number,
    mostRecentBlog: string,
    ReviewPreview: string,
    BlogPreview: string;
}

export default Profile;