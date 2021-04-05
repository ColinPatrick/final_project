import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FilmDB = (props: FilmDBProps) => {
    const [movies, setMovies] = useState([]);
    const [totalPages, setTotalPages] = useState(500);
    const [currentPage, setCurrentPage] = useState(2);
    const [isBottom, setIsBottom] = useState(false);

    const posterLink = "https://image.tmdb.org/t/p/w92";

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (currentPage <= 2) {
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=14257b7461dc5f7e2f6cf229f055bf83`)
                .then(res => res.json())
                .then(allMovies => setMovies(allMovies.results))
                .catch(error => console.log(error))
        }
    })

    useEffect(() => {
        if (isBottom) {
            addItems();
        }
    }, [isBottom])

    const handleScroll = () => {
        const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        if (scrollTop + window.innerHeight + 65 >= scrollHeight) {
            setIsBottom(true);
        };
    };

    const addItems = async () => {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=14257b7461dc5f7e2f6cf229f055bf83&with_genres=27&page=${currentPage}`)
            .then(res => res.json())
            .then(data => setMovies([...movies, ...data.results]))
            .then(res => setCurrentPage(currentPage + 1))
            .then(res => setIsBottom(false))
        if (currentPage == totalPages) return;
    }

    return (
        <main className="container d-flex justify-content-center">
            <div className="row d-flex justify-content-center">
                <div className="col-md-12 d-flex justify-content-center flex-wrap m-1">
                    <h1>Database</h1>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Dropdown button
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" href="#">Action</a>
                            <a className="dropdown-item" href="#">Another action</a>
                            <a className="dropdown-item" href="#">Something else here</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 d-flex justify-content-center flex-wrap m-1">
                    <h5>Sort By:</h5>
                </div>
                <div className="col-md-12 d-flex justify-content-center flex-wrap">
                    <button type="button" className="btn btn-link text-dark">Popularity(asc)</button>
                    <button type="button" className="btn btn-link text-dark">Popularity(desc)</button>
                    <button type="button" className="btn btn-link text-dark">Release(asc)</button>
                    <button type="button" className="btn btn-link text-dark">Release(desc)</button>
                    <button type="button" className="btn btn-link text-dark">Title(asc)</button>
                    <button type="button" className="btn btn-link text-dark">Title(desc)</button>
                </div>
                <div className="col-md-9 d-flex justify-content-center flex-wrap m-1">
                    <div className="col-md-12 d-flex justify-content-center flex-wrap">
                        <h5>Filter:</h5>
                    </div>
                    <button type="button" className="btn btn-link text-dark">Action</button>
                    <button type="button" className="btn btn-link text-dark">Adventure</button>
                    <button type="button" className="btn btn-link text-dark">Animation</button>
                    <button type="button" className="btn btn-link text-dark">Comedy</button>
                    <button type="button" className="btn btn-link text-dark">Crime</button>
                    <button type="button" className="btn btn-link text-dark">Documentary</button>
                    <button type="button" className="btn btn-link text-dark">Drama</button>
                    <button type="button" className="btn btn-link text-dark">Family</button>
                    <button type="button" className="btn btn-link text-dark">Fantasy</button>
                    <button type="button" className="btn btn-link text-dark">History</button>
                    <button type="button" className="btn btn-link text-dark">Horror</button>
                    <button type="button" className="btn btn-link text-dark">Mystery</button>
                    <button type="button" className="btn btn-link text-dark">Music</button>
                    <button type="button" className="btn btn-link text-dark">Romance</button>
                    <button type="button" className="btn btn-link text-dark">Science-Fiction</button>
                    <button type="button" className="btn btn-link text-dark">TV-Movie</button>
                    <button type="button" className="btn btn-link text-dark">Thriller</button>
                    <button type="button" className="btn btn-link text-dark">War</button>
                    <button type="button" className="btn btn-link text-dark">Western</button>
                </div>
                <div className="col-md-12 d-flex flex-wrap justify-content-center">
                    {movies.map((movie: { id: any; title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal; poster_path: any; overview: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal; }) => (
                        <div key={`movie-${movie.id}`} className="col-md-2 card rounded shadow border overflow-hidden d-flex mx-1 my-2 pb-3">
                            <Link className="h6 text-truncate text-dark pt-2" to='/'>{movie.title}</Link>
                            <img src={`${posterLink}${movie.poster_path}`} alt="poster" />
                        </div>
                    ))}
                </div>
            </div>

        </main>
    );

};

interface FilmDBProps { }


export default FilmDB;
