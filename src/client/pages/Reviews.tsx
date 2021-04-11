import * as React from 'react';
import { ILog } from '../utils/types';
import { useParams, Link } from 'react-router-dom';

const Reviews: React.FC<ReviewsProps> = props => {

    const { userid } = useParams<ParamsProps>();

    const [filmLogs, setFilmLogs] = React.useState<ILog[]>([]);
    const [author, setAuthor] = React.useState('');

    const posterLink = "https://image.tmdb.org/t/p/w92";

    React.useEffect(() => {
        (async () => {
            const res = await fetch(`/api/logs/${userid}`)
            const logs = await res.json();
            setFilmLogs(logs);
        })();
    }, []);

    React.useEffect(() => {
        (async () => {
            const res = await fetch(`/api/user/${userid}`)
            const reviewAuthor = await res.json();
            setAuthor(reviewAuthor.username);
        })();
    }, []);

    return (
        <main className="container d-flex justify-content-center">
            <div className="row d-flex justify-content-center">
                <div className="col-md-12 d-flex justify-content-center mb-3">
                    <h1 className="my-4">All reviews by {author}:</h1>
                </div>
                <div className="col-md-12 d-flex justify-content-center flex-column">
                    {filmLogs.map((movie: ILog) => (
                        <div key={`film-review-for-${movie.id}`} className="w-100 d-flex justify-content-center">
                            {movie.review &&
                                <div className="w-50 d-flex flex-wrap justify-content-center border rounded shadow my-2">
                                    <div className="col-md-4 d-flex justify-content-start border-bottom">
                                        <img className="py-3" src={`${posterLink}${movie.poster}`} alt="reviewImage"/>
                                    </div>
                                    <div className="col-md-8 d-flex justify-content-start align-items-center border-bottom">
                                        <Link className="h4 text-dark" to={`/review/${movie.id}`}>{movie.name}</Link>
                                    </div>
                                    <div className="col-md-12 d-flex justify-content-center align-items-center">
                                        <p className="py-3">{movie.review.substring(0, 125)}...</p>
                                    </div>
                                </div>
                            }
                        </div>                                                                                         
                    ))}
                </div>
            </div>
        </main>
    );
}

interface ReviewsProps {}

interface ParamsProps {
    userid: string;
}

export default Reviews;