import * as React from 'react';
import { useState, useEffect } from 'react';

const FilmDB = (props: FilmDBProps) => {
	const [movies, setMovies] = useState([]);
	const [totalPages, setTotalPages] = useState(500);
	const [currentPage, setCurrentPage] = useState(2);
	const [isBottom, setIsBottom] = useState(false);

	const posterLink = "https://image.tmdb.org/t/p/w185";

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	useEffect(() => {
		if(currentPage <=2) {
			fetch(`https://api.themoviedb.org/3/discover/movie?api_key=14257b7461dc5f7e2f6cf229f055bf83&with_genres=27`)
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
				<div className="col-md-12 d-flex flex-wrap justify-content-center">
					{movies.map((movie: { id: any; title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal; poster_path: any; overview: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal; }) => (
					<div key={`movie-${movie.id}`} className="col-md-4 border my-2">
						<h4>{movie.title}</h4>
						<br/>
						<img src={`${posterLink}${movie.poster_path}`} alt="poster"/>
						<hr/>
						<p>{movie.overview}</p>
					</div>
					))}
				</div>
			</div>
			
		</main>
	);

};

interface FilmDBProps {}


export default FilmDB;
