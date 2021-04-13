import * as React from 'react';
import { json, User } from '../utils/api';
import { ILog } from '../utils/types';
import { RouteComponentProps, withRouter, useParams, useHistory, Link } from 'react-router-dom';

const ReviewAdmin: React.FC<ReviewAdminProps> = props => {
    
    const { logid } = useParams<ParamsProps>();

    const [filmLog, setFilmLog] = React.useState<ILog>();
    const [review, setReview] = React.useState('');
    const [isLoggedIn, setIsLoggedIn] = React.useState(true);

    const posterLink = "https://image.tmdb.org/t/p/w154";

    React.useEffect(() => {
        (async () => {
            const res = await fetch(`/api/log/${logid}`);
            const log: ILog = await res.json();
            setReview(log.review);
        })();
    }, []);

    React.useEffect(() => {
        (async () => {
            const res = await fetch(`/api/log/${logid}`);
            const log: ILog = await res.json();
            setFilmLog(log);
        })();
    }, []);

    React.useEffect(() => {
        if (!User.userid) {
            setIsLoggedIn(false);
        };
    }, []);

    if(!isLoggedIn) {
        return (
            <div className="container d-flex justify-content-center my-2">
                <div className="row d-flex justify-content-center my-2">
                    <div className="col-md-8 d-flex justify-content-center my-2">
                        <h1 className="my-3">You are not logged in. Please go to the login page to sign in.</h1>
                    </div>
                </div>
            </div>
        );
    };

    if(!filmLog) {
        return (
            <h1>Loading...</h1>
        );
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        let reviewObject: { review: string } = {
            review: review
        };

        let reviewRes = await json(`/api/logs/${logid}`, 'PUT', reviewObject);
        if (reviewRes) {
            props.history.push(`/review/${logid}`);
        } else {
            console.log('wut');
        };
    };

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        let reviewObject: { review: string } = {
            review: null
        };

        let reviewRes = await json(`/api/logs/${logid}`, 'PUT', reviewObject);
        if (reviewRes) {
            props.history.push(`/reviews/${filmLog.userid}`);
        };
    };

    return (
        <main className="container">
            <section className="row d-flex justify-content-center">
                <div className="w-100 d-flex justify-content-center flex-wrap">
                    <div className="w-100 d-flex justify-content-center my-2">
                        <h3 className="text-white">{filmLog.username}</h3>
                    </div>
                    <div className="w-100 d-flex justify-content-center my-3">
                        <img src={`${posterLink}${filmLog.poster}`} alt="moviePoster"/>
                    </div>
                    <div className="w-100 d-flex justify-content-center my-2">
                        <h5 className="text-white">Edit your review for: {filmLog.name}</h5>
                    </div>
                    <div className="card col-md-7 border shadow rounded mt-2">
                        <div className="form-group p-3">
                            <label htmlFor="review" className="m-2">Your Review:</label>
                            <textarea
                                defaultValue={review}
                                onChange={e => setReview(e.target.value)} 
                                rows={20}
                                className="form-control form-control-log my-2"
                                placeholder="Write your review here..."                              
                            />
                            <div className="d-flex justify-content-around">                                
                                <button className="btn btn-outline-danger" onClick={ handleDelete }>Delete Review</button>
                                <button className="btn btn-outline-primary" onClick={ handleSubmit }>Save Edits</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

interface ParamsProps {
    logid: string
};

interface ReviewAdminProps extends RouteComponentProps {};

export default withRouter (ReviewAdmin);