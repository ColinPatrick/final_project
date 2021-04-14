import * as React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ILog } from '../utils/types';
import { json, User } from '../utils/api';
import { nanoid } from 'nanoid';
import BeautyStars from 'beauty-stars';

const LoggedFilms: React.FC<LoggedFilmsProps> = props => {

    const { userid } = useParams<ParamsProps>();

    const posterLink = "https://image.tmdb.org/t/p/w92";

    const [loggedFilms, setLoggedFilms] = React.useState<ILog[]>([]);
    const [isUserAdmin, setIsUserAdmin] = React.useState<boolean>(false);
    const [author, setAuthor] = React.useState<string>('');
    const [reloadCount, setReloadCount] = React.useState<number>(1);

    React.useEffect(() => {
        fetch(`/api/logs/${userid}`)
        .then(res => res.json())
        .then(logs => setLoggedFilms(logs))
    }, [reloadCount]);

    React.useEffect(() => {
        if (User.userid == userid) {
            setIsUserAdmin(true);
        } else {
            console.log('This user is not the admin of this page');
        }
    }, [reloadCount]);

    React.useEffect(() => {
        (async () => {
            const res = await fetch(`/api/user/${userid}`)
            const watchlistAuthor = await res.json();
            setAuthor(watchlistAuthor.username);
        })();
    }, [reloadCount]);

    const handleDelete = async (logid: number) => {
        let res = await json(`/api/logs/${logid}`, 'DELETE');
        if (res) {
            alert('You removed this item from your list of watched movies!')
            setReloadCount(reloadCount + 1);
        };
    };

    if (!loggedFilms) {
        return <h1>Loading...</h1>
    };

    return (
        <main className="container">
            <section className="row">
                <div className="w-100 d-flex justify-content-center flex-wrap">
                <div className="col-md-12 d-flex justify-content-center mb-3">
                    <h1 className="text-dark my-4">Logged Films Seen By {author}:</h1>
                </div>
                    <div className="col md-10 d-flex justify-content-center flex-wrap">
                        {loggedFilms.map(log => (
                            <div key={nanoid()} className="col-md-2 rounded shadow border overflow-hidden d-flex justify-content-center flex-wrap bg-white mx-2 my-2 pb-3">
                                <div className="w-100 d-flex justify-content-center py-1">
                                    <Link className="h6 font-weight-bold text-truncate text-dark pt-2" to={`/film/${log.filmid}`}>{log.name}</Link>
                                </div>
                                <div className="w-100 d-flex justify-content-center pb-1">
                                    <img src={`${posterLink}${log.poster}`} alt="poster" />
                                </div>
                                <div className="w-100 d-flex justify-content-center my-2">
                                    <BeautyStars
                                    value={log.ratings}
                                    editable={false}
                                    size={16}
                                    gap={8} 
                                    />
                                </div>
                                {log.review &&
                                    <div className="w-100 d-flex justify-content-center pt-1">
                                        <Link className="text-success" to={`/review/${log.id}`}>Read Review</Link>
                                    </div>                                
                                }
                                {!log.review && User.userid &&
                                    <div className="w-100 d-flex justify-content-center pt-1">
                                        <Link className="text-primary" to={`/review/compose/${log.id}`}>Write Review</Link>
                                    </div>
                                }
                                {isUserAdmin &&
                                    <div className="w-100 d-flex justify-content-center">
                                        <button className="btn btn-link text-danger" onClick={() => handleDelete(log.id)}>Remove</button>
                                    </div>
                                }
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

interface LoggedFilmsProps {};

interface ParamsProps {
    userid: string;
};

export default LoggedFilms;