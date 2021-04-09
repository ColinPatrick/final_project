import * as React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ILog } from '../utils/types';
import { User } from '../utils/api';

const SingleReview: React.FC<SingleReviewProps> = props => {
    
    const { logid } = useParams<ParamsProps>();

    const [filmInfo, setFilmInfo] = React.useState<ILog>();
    const [author, setAuthor] = React.useState<string>('');
    const [isAdmin, setIsAdmin] = React.useState<boolean>(false);

    const posterLink = "https://image.tmdb.org/t/p/w154";

    React.useEffect(() => {
        fetch(`/api/log/${logid}`)
        .then(res => res.json())
        .then(log => setFilmInfo(log));
    }, []);

    React.useEffect(() => {
        if(filmInfo){
            if (User.userid == filmInfo.userid) {
                setIsAdmin(true);
            } else {
                console.log('User is not admin.')
            }
        }
    }, [filmInfo]);

    if (!filmInfo) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <main className="container d-flex justify-content-center">
            <section className="row d-flex justify-content-center">
                <div className="col-md-12 d-flex justify-content-center flex-wrap my-5">
                    <div className="w-100 d-flex justify-content-center">
                        <h1 className="text-center my-3">A Review of {filmInfo.name}</h1>
                    </div>
                    <div className="w-100 d-flex justify-content-center my-3">
                        <img src={`${posterLink}${filmInfo.poster}`} alt="moviePoster"/>
                    </div>
                    <div className="w-100 d-flex justify-content-center my-2">
                        <h4>By {filmInfo.username}</h4>
                    </div>
                    <div className="card w-50 d-flex justify-content-center rounded shadow mt-3">
                        <div className="w-100 d-flex justify-content-center">
                            <p className="card-text p-4">{filmInfo.review}</p>
                        </div>
                        {isAdmin && 
                            <div className="w-100 d-flex justify-content-end">
                                <Link to={`/review/admin/${filmInfo.id}`} className="btn btn-outline-secondary m-2">Amin Options</Link>
                            </div>
                        }
                    </div>
                </div>
            </section>
        </main>
    );
};

interface ParamsProps {
    logid: string
};

interface SingleReviewProps {}

export default SingleReview;