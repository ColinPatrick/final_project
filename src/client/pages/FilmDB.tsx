import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { nanoid } from 'nanoid';

const FilmDB = (props: FilmDBProps) => {
    const [movies, setMovies] = useState([]);
    const [totalPages, setTotalPages] = useState(500);
    const [currentPage, setCurrentPage] = useState(2);
    const [isBottom, setIsBottom] = useState(false);
    const [genre, setGenre] = useState('');
    const [sort, setSort] = useState('');

    const sortOptions = [
        { value: 0, label: 'Select...' },
        { value: 1, label: 'Popular (Ascending)' },
        { value: 2, label: 'Popular (Descending)' },
        { value: 3, label: 'Release (Ascending)' },
        { value: 4, label: 'Release (Descending)' },
        { value: 5, label: 'Title (Ascending)' },
        { value: 6, label: 'Title (Descending)' }
    ]

    const genreOptions = [
        { value: 0, label: 'Select...' },
        { value: 1, label: 'Action' },
        { value: 2, label: 'Adventure' },
        { value: 3, label: 'Animation' },
        { value: 4, label: 'Comedy' },
        { value: 5, label: 'Crime' },
        { value: 6, label: 'Documentary' },
        { value: 7, label: 'Drama' },
        { value: 8, label: 'Family' },
        { value: 9, label: 'Fantasy' },
        { value: 10, label: 'History' },
        { value: 11, label: 'Horror' },
        { value: 12, label: 'Music' },
        { value: 13, label: 'Mystery' },
        { value: 14, label: 'Romance' },
        { value: 15, label: 'Science-Fiction' },
        { value: 16, label: 'TV-Movie' },
        { value: 17, label: 'Thriller' },
        { value: 18, label: 'War' },
        { value: 19, label: 'Western' }
    ]

    const posterLink = "https://image.tmdb.org/t/p/w92";

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (currentPage <= 2) {
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=14257b7461dc5f7e2f6cf229f055bf83${sort}&include_adult=false${genre}`)
                .then(res => res.json())
                .then(allMovies => setMovies(allMovies.results))
                .catch(error => console.log(error))
        }
    }, [sort, genre])

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

    const handleSortChange = (obj: any) => {
        if (obj.value == 0) {
            setSort('');
            setCurrentPage(2);
        } else if (obj.value == 1) {
            setSort('&sort_by=popularity.asc');
            setCurrentPage(2);
        } else if (obj.value == 2) {
            setSort('&sort_by=popularity.desc');
            setCurrentPage(2);
        } else if (obj.value == 3) {
            setSort('&sort_by=release_date.asc');
            setCurrentPage(2);
        } else if (obj.value == 4) {
            setSort('&sort_by=release_date.desc');
            setCurrentPage(2);
        } else if (obj.value == 5) {
            setSort('&sort_by=original_title.asc');
            setCurrentPage(2);
        } else if (obj.value == 6) {
            setSort('&sort_by=original_title.desc');
            setCurrentPage(2);
        };
    };

    const handleGenreChange = (obj: any) => {
        if (obj.value == 0) {
            setGenre('')
            setCurrentPage(2);
        } else if (obj.value == 1) {
            setGenre('&with_genres=28')
            setCurrentPage(2);
        } else if (obj.value == 2) {
            setGenre('&with_genres=12')
            setCurrentPage(2);
        } else if (obj.value == 3) {
            setGenre('&with_genres=16')
            setCurrentPage(2);
        } else if (obj.value == 4) {
            setGenre('&with_genres=35')
            setCurrentPage(2);
        } else if (obj.value == 5) {
            setGenre('&with_genres=80')
            setCurrentPage(2);
        } else if (obj.value == 6) {
            setGenre('&with_genres=99')
            setCurrentPage(2);
        } else if (obj.value == 7) {
            setGenre('&with_genres=18')
            setCurrentPage(2);
        } else if (obj.value == 8) {
            setGenre('&with_genres=10751')
            setCurrentPage(2);
        } else if (obj.value == 9) {
            setGenre('&with_genres=14')
            setCurrentPage(2);
        } else if (obj.value == 10) {
            setGenre('&with_genres=36')
            setCurrentPage(2);
        } else if (obj.value == 11) {
            setGenre('&with_genres=27')
            setCurrentPage(2);
        } else if (obj.value == 12) {
            setGenre('&with_genres=10402')
            setCurrentPage(2);
        } else if (obj.value == 13) {
            setGenre('&with_genres=9648')
            setCurrentPage(2);
        } else if (obj.value == 14) {
            setGenre('&with_genres=10749')
            setCurrentPage(2);
        } else if (obj.value == 15) {
            setGenre('&with_genres=878')
            setCurrentPage(2);
        } else if (obj.value == 16) {
            setGenre('&with_genres=10770')
            setCurrentPage(2);
        } else if (obj.value == 17) {
            setGenre('&with_genres=53')
            setCurrentPage(2);
        } else if (obj.value == 18) {
            setGenre('&with_genres=10752')
            setCurrentPage(2);
        } else if (obj.value == 19) {
            setGenre('&with_genres=37')
            setCurrentPage(2);
        }
    }

    const addItems = async () => {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=14257b7461dc5f7e2f6cf229f055bf83${sort}&include_adult=false${genre}&page=${currentPage}`)
            .then(res => res.json())
            .then(data => setMovies([...movies, ...data.results]))
            .then(res => console.log(res))
            .then(res => setCurrentPage(currentPage + 1))
            .then(res => setIsBottom(false))
        if (currentPage == totalPages) return;
    }

    return (
        <main className="container d-flex justify-content-center">
            <div className="row d-flex justify-content-center">
                <div className="col-md-12 d-flex justify-content-center flex-wrap m-1">
                    <h1>Database</h1>
                </div>
                <div className="col-md-10 d-flex justify-content-between my-2">
                    <div className="app col-md-4 mx-2 mt-2 mb-4">
                        <h6>Sort By:</h6>
                        <Select
                            options={sortOptions}
                            onChange={handleSortChange}
                        />
                    </div>
                    <div className="app col-md-4 mx-2 mt-2 mb-4">
                        <h6>Filter Genre:</h6>
                        <Select
                            options={genreOptions}
                            onChange={handleGenreChange}
                        />
                    </div>
                </div>

                <div className="col-md-12 d-flex flex-wrap justify-content-center">
                    {movies
                        .filter(movie => movie.poster_path !== null)
                        .map((movie: { id: any; title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal; poster_path: any; overview: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal; }) => (
                            <div key={nanoid()} className="col-md-2 card rounded shadow border overflow-hidden d-flex mx-1 my-2 pb-3">
                                <Link className="h6 text-truncate text-dark pt-2" to={`/film/${movie.id}`}>{movie.title}</Link>
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
