import * as React from 'react';
import { useParams } from 'react-router-dom';
import { json, User } from '../utils/api'
import { RouteComponentProps, withRouter } from 'react-router-dom';

const ComposeReview: React.FC<ComposeReviewProps> = props => {

    const { logid } = useParams<ParamsProps>();

    const [username, setUsername] = React.useState();
    const [movieTitle, setMovieTitle] = React.useState();
    const [review, setReview] = React.useState('');
    const [noUser, setNoUser] = React.useState(false);

    React.useEffect(() => {
        (async () => {
            if (User.userid) {
                const userid = User.userid;
                await fetch(`/api/user/${userid}`)
                .then(res => res.json())
                .then(user => setUsername(user.username))
            } else {
                setNoUser(true);
            }
        })();
    }, [username]);

    React.useEffect(() => {
        (async () => {
            await fetch(`/api/log/${logid}`)
            .then(res => res.json())
            .then(log => setMovieTitle(log.name))
        })();
    }, [movieTitle]);

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        let reviewObject: { review: string } = {
            review: review
        };

        let reviewRes = await json(`/api/logs/${logid}`, 'PUT', reviewObject);
        if (reviewRes) {
            props.history.push('/seen/6');
        } else {
            console.log('wut');
        }
        
    }

    if(noUser) {
        return (
            <div className="row d-flex-justify-content-center">
                <div className="w-100 d-flex justify-content-center my-3">
                    <div className="col-md-8 d-flex justify-content-center m-4">
                        <h1>You are not logged in!</h1>
                    </div>
                </div>
            </div>
        )
    }

    if(!username || !movieTitle) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <main className="container">
            <section className="row d-flex justify-content-center">
                <div className="w-100 d-flex justify-content-center flex-wrap">
                    <div className="w-100 d-flex justify-content-center my-2">
                        <h3>{username}:</h3>
                    </div>
                    <div className="w-100 d-flex justify-content-center my-2">
                        <h5>Write a review for: {movieTitle}</h5>
                    </div>
                    <div className="card col-md-7 border shadow rounded mt-2">
                        <div className="form-group p-3">
                            <label htmlFor="review" className="m-2">Your Review:</label>
                            <textarea
                                value={review}
                                onChange={e => setReview(e.target.value)} 
                                rows={20}
                                className="form-control form-control-log my-2"
                                placeholder="Write your review here..."                              
                            />
                            <div className="d-flex justify-content-end">
                                <button className="btn btn-primary" onClick={ handleSubmit }>Post Review</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

interface ParamsProps {
    logid: string
}

interface ComposeReviewProps extends RouteComponentProps {}

export default withRouter (ComposeReview);