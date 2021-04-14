import * as React from 'react';
import { IMovie } from '../utils/types';
import { Link } from 'react-router-dom';

const Home: React.FC<HomeProps> = props => {

    const [featuredMovies, setFeaturedMovies] = React.useState<IMovie[]>([]);

    const posterLink = "https://image.tmdb.org/t/p/w154";

    React.useEffect(() => {
        (async () => {
            try {
                await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=14257b7461dc5f7e2f6cf229f055bf83&sort_by=popularity.desc`)
                    .then(res => res.json())
                    .then(movies => setFeaturedMovies(movies.results))
            }
            catch (error) {
                console.log('hey');
            }
        })();
    }, []);

    if (!featuredMovies) {
        return (
            <h1 className="text-white">Loading...</h1>
        );
    };

    return (
        <main className="container d-flex justify-content-center newClassNameTest mb-2">
            <section className="row d-flex justify-content-center flex-wrap my-2">
                <div className="col-md-12 d-flex justify-content-center">
                    <img className="rounded" src="https://api.freelogodesign.org/files/0f1a2b0e008e457a814386b2c8c15597/thumb/logo_200x200.png?v=637540228530000000" alt="homeImg" style={{ height: 300, width: 300 }} />
                </div>
                <div className="card rounded shadow py-2 my-3" id="featured-films-card">
                    <div className="col-md-12 d-flex justify-content-center my-3">
                        <h5 className="text-white font-weight-bold">Featured Films:</h5>
                    </div>
                    <div className="col-md-12 d-flex justify-content-center mt-1 mb-3">
                        <div className="col-md-2 rounded shadow border overflow-hidden d-flex justify-content-center flex-wrap bg-white mx-2 my-2 pb-3">
                            <div className="w-100 d-flex justify-content-center py-1">
                                <Link className="h6 font-weight-bold text-truncate text-dark pt-2" to={`/film/${featuredMovies[0]?.id}`}>{featuredMovies[0]?.title}</Link>
                            </div>
                            {featuredMovies &&
                                <div className="w-100 d-flex justify-content-center pb-1">
                                    <img src={`${posterLink}${featuredMovies[0]?.poster_path}`} alt="poster" />
                                </div>
                            }
                        </div>
                        <div className="col-md-2 rounded shadow border overflow-hidden d-flex justify-content-center flex-wrap bg-white mx-2 my-2 pb-3">
                            <div className="w-100 d-flex justify-content-center py-1">
                                <Link className="h6 font-weight-bold text-truncate text-dark pt-2" to={`/film/${featuredMovies[1]?.id}`}>{featuredMovies[1]?.title}</Link>
                            </div>
                            {featuredMovies &&
                                <div className="w-100 d-flex justify-content-center pb-1">
                                    <img src={`${posterLink}${featuredMovies[1]?.poster_path}`} alt="poster2" />
                                </div>
                            }
                        </div>
                        <div className="col-md-2 rounded shadow border overflow-hidden d-flex justify-content-center flex-wrap bg-white mx-2 my-2 pb-3">
                            <div className="w-100 d-flex justify-content-center py-1">
                                <Link className="h6 font-weight-bold text-truncate text-dark pt-2" to={`/film/${featuredMovies[2]?.id}`}>{featuredMovies[2]?.title}</Link>
                            </div>
                            {featuredMovies &&
                                <div className="w-100 d-flex justify-content-center pb-1">
                                    <img src={`${posterLink}${featuredMovies[2]?.poster_path}`} alt="poster2" />
                                </div>
                            }
                        </div>
                        <div className="col-md-2 rounded shadow border overflow-hidden d-flex justify-content-center flex-wrap bg-white mx-2 my-2 pb-3">
                            <div className="w-100 d-flex justify-content-center py-1">
                                <Link className="h6 font-weight-bold text-truncate text-dark pt-2" to={`/film/${featuredMovies[3]?.id}`}>{featuredMovies[3]?.title}</Link>
                            </div>
                            {featuredMovies &&
                                <div className="w-100 d-flex justify-content-center pb-1">
                                    <img src={`${posterLink}${featuredMovies[3]?.poster_path}`} alt="poster2" />
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-md-12 d-flex justify-content-center mt-5 mb-1">
                    <h4 className="text-dark">New to ReactCinema?</h4>
                </div>
                <div className="col-md-12 d-flex justify-content-center mt-1 mb-3">
                    <Link className="btn btn-primary" to="/register">Create an account today!</Link>
                </div>
                <div className="col-md-12 d-flex justify-content-center mt-4 mb-0">
                    <p className="text-dark mb-0 mt-2">This product uses the TMDb API but is not endorsed or certified by TMDb.</p>
                </div>
                <div className="col-md-12 d-flex justify-content-center">
                    <img className="rounded" src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg" alt="TMDDpic" style={{ height: 150, width: 600 }} />
                </div>
            </section>
        </main>
    );
};

interface HomeProps { };

export default Home;