import * as React from 'react';
import { useParams, Link } from 'react-router-dom';
import { user, ILog, IBlog } from '../utils/types';
import { User } from '../utils/api';
import moment from 'moment';

const Profile: React.FC<ProfileProps> = props => {

    const { userid } = useParams<ParamsProps>();

    const [userInfo, setUserInfo] = React.useState<user>();
    const [userLogs, setUserLogs] = React.useState<ILog[]>([]);
    const [userBlogs, setUserBlogs] = React.useState<IBlog[]>([]);
    const [isUserAdmin, setIsUserAdmin] = React.useState<boolean>(false);

    React.useEffect(() => {
        (async () => {
            const res = await fetch(`/api/user/${userid}`);
            const profileUser = await res.json();
            setUserInfo(profileUser);
        })();
    }, []);

    React.useEffect(() => {
        (async () => {
            const res = await fetch(`/api/logs/${userid}`);
            const profileLogs = await res.json();
            setUserLogs(profileLogs);
        })();
    }, []);

    React.useEffect(() => {
        (async () => {
            const res = await fetch(`/api/blogs/${userid}`);
            const profileBlogs = await res.json();
            setUserBlogs(profileBlogs);
        })();
    }, []);

    React.useEffect(() => {
        if (User.userid == userid) {
            setIsUserAdmin(true);
        };
    }, []);

    if (!userInfo) {
        return (
            <h1>Loading...</h1>
        );
    };

    if (!userBlogs) {
        return (
            <h1>Loading...</h1>
        );
    };

    if (!userLogs) {
        return (
            <h1>Loading...</h1>
        );
    };

    return (
        <main className="container d-flex justify-content-center my-2">
            <section className="row d-flex justify-content-center flex-wrap my-2">
                <div className="col-md-12 d-flex justify-content-center my-4">
                    <h1>{userInfo.username}'s Profile</h1>
                </div>
                <div className="col-md-12 d-flex justify-content-center my-2">
                    <img src="https://www.publicdomainpictures.net/pictures/300000/velka/movie-clapperboard.jpg" alt="profileImg" className="topProfileImg" />
                </div>
                <div className="d-flex justify-content-center flex-wrap mx-3 mt-1 mb-3">
                    <div className="col-sm-4 d-flex justify-content-center align-items-center flex-wrap border rounded shadow m-2">
                        <div className="w-100 d-flex justify-content-center align-items-center">
                            <Link className="h2 text-dark my-2 pt-1" to={`/watchlist/${userid}`}>Watchlist</Link>
                        </div>
                        <div className="w-100 d-flex justify-content-center align-items-center p-3">
                            <img src="https://www.publicdomainpictures.net/pictures/270000/velka/watching-tv.jpg" alt="watchlistPic" className="profileLinkPic" />
                        </div>
                    </div>
                    <div className="col-sm-4 d-flex justify-content-center align-items-center flex-wrap border rounded shadow m-2">
                        <div className="w-100 d-flex justify-content-center align-items-center">
                            <Link className="h2 text-dark my-2 pt-1" to={`/seen/${userid}`}>Seen Films</Link>
                        </div>
                        <div className="w-100 d-flex justify-content-center align-items-center p-3">
                            <img src="https://www.publicdomainpictures.net/pictures/270000/velka/feedback-survey-review-best-e.jpg" alt="watchlistPic" className="profileLinkPic2" />
                        </div>
                    </div>
                    <div className="col-sm-4 d-flex justify-content-center align-items-center flex-wrap border rounded shadow lowerProfileImgs m-2">
                        <div className="w-100 d-flex justify-content-center align-items-center">
                            <Link className="h2 text-dark my-2 pt-1" to={`/reviews/${userid}`}>Reviews</Link>
                        </div>
                        <div className="w-100 d-flex justify-content-center align-items-center p-3">
                            <img src="https://www.publicdomainpictures.net/pictures/270000/velka/low-customer-satisfaction.jpg" alt="watchlistPic" className="profileLinkPic3" />
                        </div>
                    </div>
                    <div className="col-sm-4 d-flex justify-content-center align-items-center flex-wrap border rounded shadow lowerProfileImgs m-2">
                        <div className="w-100 d-flex justify-content-center align-items-center">
                            <Link className="h2 text-dark my-2 pt-1" to={`/blogs/${userid}`}>Blogs</Link>
                        </div>
                        <div className="w-100 d-flex justify-content-center align-items-center p-3">
                            <img src="https://www.publicdomainpictures.net/pictures/250000/velka/writing-1516440488vKR.jpg" alt="watchlistPic" className="profileLinkPic4" />
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center flex-wrap m-4">
                    {userBlogs[0] &&
                        <div className="d-flex justify-content-center flex-wrap m-2">
                            <div className="w-100 d-flex justify-content-center mx-1 mb-3">
                                <h4>{userInfo.username}'s latest blog post!</h4>
                            </div>
                            <div className="card col-md-7 d-flex justify-content-center flex-wrap border rounded shadow mx-1 my-3">
                                <div className="card-body d-flex justify-content-center flex-wrap">
                                    <div className="w-100 d-flex justify-content-center align-items-center">
                                        <h6 className="card-title pb-1">{userBlogs[0].title}</h6>
                                    </div>
                                    <div className="w-100 d-flex justify-content-center align-items-center">
                                        <p className="card-text pt-1">{userBlogs[0].content}</p>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <p>{moment(userBlogs[0]._created).format("MMM Do YYYY")}</p>
                                </div>
                            </div>
                        </div>
                    }
                    {!userBlogs[0] &&
                        <div className="d-flex justify-content-center flex-wrap m-2">
                            <div className="w-100 d-flex justify-content-center m-1">
                                <h4>{userInfo.username}'s hasn't posted any blogs yet!</h4>
                            </div>
                        </div>
                    }
                    {isUserAdmin &&
                        <div className="w-100 d-flex justify-content-center flex-wrap m-2">
                            <div className="w-100 d-flex justify-content-center m-1">
                                <Link className="h3 text-dark my-2 pt-1" to={"/new/blog/compose"}>Post a new blog!</Link>
                            </div>
                        </div>
                    }
                </div>
            </section>
        </main>
    );
};

interface ProfileProps { };

interface ParamsProps {
    userid: string;
};

export default Profile;