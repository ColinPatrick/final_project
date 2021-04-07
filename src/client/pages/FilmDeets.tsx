import * as React from 'react';
import { useParams, } from 'react-router-dom';
import { IMovie } from '../utils/types';

const FilmDeets: React.FC<FilmDeetsProps> = props => {

    const { filmid } = useParams<ParamsProps>();

    const [movieDeets, setMovieDeets] = React.useState<IMovie>(null);

    const posterLink = "https://image.tmdb.org/t/p/w154";

    const backdropLink = "https://image.tmdb.org/t/p/w780";

    React.useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${filmid}?api_key=14257b7461dc5f7e2f6cf229f055bf83&language=en-US`)
            .then(res => res.json())
            .then(movie => setMovieDeets(movie))
    }, [movieDeets])

    if (!movieDeets) {
        return <h1>Loading...</h1>
    }

    return (
        <main className="container">
            <section className="row">
                <div className="col-md-12 d-flex justify-content-center">
                    <img src={`${backdropLink}${movieDeets.backdrop_path}`} alt="backdrop" />
                </div>
                <div className="col-md-12 d-flex justify-content-start">
                    <div className="d-flex justify-content-center flex-column border rounded shadow my-3">
                        <div className="col-md-12 d-flex justify-content-center mt-3 mb-1">
                            <h3 className="card-title">{movieDeets.title}</h3>
                        </div>
                        <div className="col-md-12 d-flex justify-content-center mb-2">
                            <img src={`${posterLink}${movieDeets.poster_path}`} alt="poster" />
                        </div>
                        <div className="col-md-12 d-flex justify-content-center mt-1 mb-3">
                            <h6 className="card-text">{movieDeets.tagline}</h6>
                        </div>
                    </div>
                </div>
                <div className="w-100 d-flex justify-content-center">
                    <div className="col-md-7 border rounded shadow mx-1 my-3">
                        <h5>Plot:</h5>
                        <p>{movieDeets.overview}</p>
                    </div>
                </div>
            </section>
        </main>
    );
}

interface FilmDeetsProps { }

interface ParamsProps {
    filmid: string
}

export default FilmDeets;