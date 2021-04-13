import * as React from 'react';
import { useParams, } from 'react-router-dom';
import { IMovie, ILog } from '../utils/types';
import { json, User } from '../utils/api';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import BeautyStars from 'beauty-stars';

const FilmDeets: React.FC<FilmDeetsProps> = props => {

    const { filmid } = useParams<ParamsProps>();

    const [movieDeets, setMovieDeets] = React.useState<IMovie>(null);
    const [wlBtnHide, setWlBtnHide] = React.useState('');
    const [isFilmLogged, setIsFilmLogged] = React.useState(false);
    const [isFilmAddedToWatchlist, setIsFilmAddedToWatchlist] = React.useState(false);
    const [userLogs, setUserLogs] = React.useState([]);
    const [userWatchlist, setUserWatchlist] = React.useState([]);
    const [starValue, setStarValue] = React.useState(0);
    const [loggedStarValue, setLoggedStarValue] = React.useState(0);

    const posterLink = "https://image.tmdb.org/t/p/w154";

    const backdropLink = "https://image.tmdb.org/t/p/w1280";
    const backupBackdrop = "https://www.publicdomainpictures.net/pictures/300000/velka/cinema-movie.jpg";

    React.useEffect(() => {
        (async () => {
            await fetch(`https://api.themoviedb.org/3/movie/${filmid}?api_key=14257b7461dc5f7e2f6cf229f055bf83&language=en-US`)
                .then(res => res.json())
                .then(movie => setMovieDeets(movie));
        })();
    }, []);

    React.useEffect(() => {
        if (User.userid) {
            const userid = User.userid;
            (async () => {
                await fetch(`/api/logs/${userid}`)
                    .then(res => res.json())
                    .then(logs => {
                        setUserLogs(logs);
                    })
            })();
        }
    }, []);

    React.useEffect(() => {
        const userid = User.userid;
        userLogs.map(log => {
            if (log.filmid == filmid) {
                setLoggedStarValue(log.ratings);
                setWlBtnHide('d-none');
                setIsFilmLogged(true);
            } else {
                console.log('This film is not one of your logged movies.');
            };
        });
    }, [userLogs]);

    React.useEffect(() => {
        if (User.userid) {
            const userid = User.userid;
            (async () => {
                await fetch(`/api/watchlist/${userid}`)
                    .then(res => res.json())
                    .then(watchlist => {
                        setUserWatchlist(watchlist);
                    })
            })();
        };
    }, []);

    React.useEffect(() => {
        const userid = User.userid;
        userWatchlist.map(movie => {
            if (movie.filmid == filmid) {
                setIsFilmAddedToWatchlist(true);
            } else {
                console.log('This film is not in your watchlist');
            }
        })
    }, [userWatchlist]);

    const handleWatchlistAdd = async () => {
        if (!User.userid) {
            props.history.push('/login');
        } else {
            let listItem: { userid: number, filmid: number } = {
                userid: User.userid,
                filmid: Number(filmid)
            };
            const res = await fetch(`/api/films/${filmid}`);
            const isFilmPresent = await res.json();

            if (isFilmPresent) {
                const watchlistRes = await json('/api/watchlist', 'POST', listItem);
                alert('Added to your watchlist!');
            } else {
                let filmInfo: { filmid: number, name: string, poster: string } = {
                    filmid: movieDeets.id,
                    name: movieDeets.title,
                    poster: movieDeets.poster_path
                };
                const filmRes = await fetch('/api/films', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(filmInfo)
                });
                const watchlistRes = await json('/api/watchlist', 'POST', listItem);
                alert('Added to your watchlist!');
            };

        };
    };

    const handleLogFilmAdd = async () => {
        if (!User.userid) {
            props.history.push('/login');
        } else {
            let listItem: { userid: number, filmid: number, ratings: number } = {
                userid: User.userid,
                filmid: Number(filmid),
                ratings: Number(starValue)
            };
            const res = await fetch(`/api/films/${filmid}`);
            const isFilmPresent = await res.json();

            if (isFilmPresent) {
                const logRes = await json('/api/logs', 'POST', listItem);
                alert('Added to your list of seen films!');
            } else {
                let filmInfo: { filmid: number, name: string, poster: string } = {
                    filmid: movieDeets.id,
                    name: movieDeets.title,
                    poster: movieDeets.poster_path
                };
                const filmRes = await fetch('/api/films', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(filmInfo)
                });
                const logRes = await json('/api/logs', 'POST', listItem);
                alert('Added to your list of seen films!');
            };
        };
    };

    if (!movieDeets) {
        return <h1>Loading...</h1>
    };

    return (
        <main className="container">
            <section className="row d-flex justify-content-center">
                {movieDeets.backdrop_path &&
                    <div className="d-flex justify-content-center">
                        <img src={`${backdropLink}${movieDeets.backdrop_path}`} alt="backdrop" />
                    </div>
                }
                {!movieDeets.backdrop_path &&
                    <div className="d-flex justify-content-center mb-2">
                        <img src={`${backupBackdrop}`} alt="backupDrop" style={{ height: 720, width: 1500 }} />
                    </div>
                }
                <div id="filmDataContainer" className="d-flex justify-content-between">
                    <div id="filmTitleDiv" className="col-md-3 d-flex justify-content-center flex-column border rounded shadow bg-white my-3">
                        <div className="d-flex justify-content-center mt-3 mb-1">
                            <h3 className="card-title">{movieDeets.title}</h3>
                        </div>
                        <div className="d-flex justify-content-center mb-2">
                            <img src={`${posterLink}${movieDeets.poster_path}`} alt="poster" />
                        </div>
                        <div className="d-flex justify-content-center mt-1 mb-3">
                            <h6 className="card-text">{movieDeets.tagline}</h6>
                        </div>
                        <div className="d-flex flex-wrap justify-content-center">
                            {User.userid &&
                                <div>
                                    <div className="d-flex justify-content-around mt-1 mb-3">
                                        {!isFilmLogged &&
                                            <button className="btn btn-link text-dark" onClick={handleLogFilmAdd}>Log Film</button>
                                        }

                                        {!isFilmAddedToWatchlist &&
                                            <button className={`btn btn-link ${wlBtnHide} text-dark`} onClick={handleWatchlistAdd}>Add to Watchlist</button>
                                        }
                                    </div>
                                    {!isFilmLogged &&
                                        <div className="d-flex justify-content-center mt-1 mb-3">
                                            <BeautyStars
                                                value={starValue}
                                                onChange={value => setStarValue(value)}
                                            />
                                        </div>
                                    }
                                </div>
                            }
                            {isFilmLogged &&
                                <div className="d-flex justify-content-center mt-1 mb-3">
                                    <BeautyStars
                                        value={loggedStarValue}
                                        editable={false}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                    <div id="filmPlotDiv" className="col-md-9 d-flex justify-content-center mx-3">
                        <div className="border rounded shadow bg-white mx-1 my-3 p-3">
                            <h5 className="my-2">Plot:</h5>
                            <p>{movieDeets.overview}</p>
                            <hr />
                            <h5 className="my-2">Stats:</h5>
                            <p className="my-3">STATUS: {movieDeets.status}</p>
                            <p className="my-3">RELEASED ON: {movieDeets.release_date}</p>
                            <p className="my-3">RUNTIME: {movieDeets.runtime}</p>
                            <p className="my-3">GENRES: | {movieDeets.genres.map((genre: { id: number, name: string }) => (
                                ` ${genre.name} |`
                            ))}</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

interface FilmDeetsProps extends RouteComponentProps { };

interface ParamsProps {
    filmid: string
};

export default withRouter(FilmDeets);