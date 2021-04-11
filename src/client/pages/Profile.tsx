import * as React from 'react';
import * as Bootstrap from 'bootstrap';
import './PagesStyles';
import { Link, useParams } from 'react-router-dom'
//import BlogPreview from '../components/BlogPreview'
import { user } from '../utils/types'

const Profile: React.FC<ProfileProps> = (props) => {
    const { userid } = useParams<{ userid: string }>()
    const [user, setUser] = React.useState<user>()
    //const [mostRecentBlog, setMostRecentBlog] = React.useState<{ id: string }>({ id: "" })
    //const pic = 'https://images.unsplash.com/photo-1612392062335-300bb9bd3054?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80';

    const getUser = async (req, res) => {
        try {
            let res = await fetch(`/api/user/${userid}`)
            let user = await res.json()

            setUser(user)

        } catch (error) {
            console.error(error)
        }
    }

    // const getMostRecentBlog = async (req, res) => {
    //     try {
    //         let res = await fetch(`/api/blogs/${userid}`)
    //         let allUserBlogs = await res.json()
    //         let mostRecentBlog = allUserBlogs[0]
    //         setMostRecentBlog(mostRecentBlog)
    //         console.log(mostRecentBlog)

    //     } catch (error) {
    //         console.error(error)
    //     }

    // }

    // React.useEffect(() => {
    //     (async (req, res) => {
    //         getUser(req, res)
    //         getMostRecentBlog(req, res)
    //     })()
    // }, []);

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
                <div>
                    <div className="card">
                        <h5 className='card-header text-center'>Watchlist</h5>
                        {/* img should display a random thumbnail of a movie in the watchlist */}
                        <img id='Dune'
                            className="card-img-top"
                            //src={'../../public/images/watchlist.png'}
                            src={'https://images.unsplash.com/photo-1612392062335-300bb9bd3054?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80'}
                            alt="img-thumbnail" />

                        <div className="card-body">
                            <Link to={`/watchlist/${userid}`} className='btn btn-outline-primary'>Go To Watchlist</Link>
                        </div>
                    </div>

                    {/* Logs CARD */}
                    <div className="card">
                        <h5 className='card-header text-center'>Logs</h5>
                        <img id='Dune'
                            className="card-img-top"
                            //src={'../../public/images/seen.png'}
                            src={'https://images.unsplash.com/photo-1612392062335-300bb9bd3054?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80'}
                            alt="img-thumbnail" />
                        <div className="card-body">
                            <Link to={`/seen/${userid}`} className='btn btn-outline-primary'>Go To Logs</Link>
                        </div>
                    </div>
                </div>

                {/* Blogs CARD */}
                <div className="card">
                    <h5 className='card-header text-center'>Blogs</h5>
                    <img id='Dune'
                        className="card-img-top"
                        // src={'../../public/images/blog.png'}
                        src={'https://images.unsplash.com/photo-1612392062335-300bb9bd3054?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80'}
                        alt="img-thumbnail" />
                    <div className="card-body">
                        <Link to={`/blogs/${userid}`} className='btn btn-outline-primary'>Go To Blogs</Link>
                    </div>
                </div>
            </div>
        </main >
    )

}

interface ProfileProps { }

export default Profile;