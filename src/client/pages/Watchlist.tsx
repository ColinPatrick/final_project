import * as React from 'react';
import { User, json } from '../utils/api';
import { ILog } from '../utils/types';
import { useParams, Link } from 'react-router-dom';
import { nanoid } from 'nanoid';

const Watchlist: React.FC<WatchlistProps> = props => {
    
    const { userid } = useParams<ParamsProps>();

    const [watchlistFilms, setWatchlistFilms] = React.useState<ILog[]>([]);
    const [isUserAdmin, setIsUserAdmin] = React.useState<boolean>(false);
    const [author, setAuthor] = React.useState<string>('');
    const [reloadCount, setReloadCount] = React.useState<number>(1);

    const posterLink = "https://image.tmdb.org/t/p/w92";

    React.useEffect(() => {
        (async () => {
            let res = await fetch(`/api/watchlist/${userid}`)
            let watchlist = await res.json();
            setWatchlistFilms(watchlist);
        })();
    }, [reloadCount]);

    React.useEffect(() => {
        if (User.userid == userid) {
            setIsUserAdmin(true);
        } else {
            console.log('The admin of this watchlist is not logged in.')
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
        let res = await json(`/api/watchlist/${logid}`, 'DELETE');
        if (res) {
            alert('You removed this item from your watchlist!')
            setReloadCount(reloadCount + 1);
        };
    };

    return (
        <main className="container">
            <section className="row">
                <div className="w-100 d-flex justify-content-center flex-wrap">
                    <div className="col-md-12 d-flex justify-content-center mb-3">
                        <h1 className="my-4">{author}'s Watchlist':</h1>
                    </div>
                    <div className="col md-10 d-flex justify-content-center flex-wrap">
                        {watchlistFilms.map(log => (
                            <div key={nanoid()} className="col-md-2 rounded shadow border overflow-hidden d-flex justify-content-center flex-wrap mx-1 my-2 pb-3">
                                <div className="w-100 d-flex justify-content-center">
                                    <Link className="h6 text-truncate text-dark pt-2" to={`/film/${log.filmid}`}>{log.name}</Link>
                                </div>
                                <div className="w-100 d-flex justify-content-center">
                                    <img src={`${posterLink}${log.poster}`} alt="poster" />
                                </div>
                                
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
}

interface ParamsProps {
    userid: string
}

interface WatchlistProps {}

export default Watchlist;