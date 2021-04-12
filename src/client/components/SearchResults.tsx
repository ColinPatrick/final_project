import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { nanoid } from 'nanoid';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const { searchTerm } = useParams<ParamsProps>();
  const key = `14257b7461dc5f7e2f6cf229f055bf83`;

  const getMovies = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${searchTerm}&page=1&include_adult=false`
    ).then((res) => res.json());

    setResults(data.results);
  };

  useEffect(() => {
    getMovies();
  }, [searchTerm]);

  return (
    <>
      <main className="container d-flex justify-content-center">
        <div className="row d-flex justify-content-center">
          <div className="col-md-12 d-flex justify-content-center flex-wrap m-1">
            <h1 className="text-white">Search Results</h1>
          </div>
          <div className="col-md-10 d-flex justify-content-between my-2"></div>

          <div className="col-md-12 d-flex flex-wrap justify-content-center">
            {results
            .filter(movie => movie.poster_path !== null)
            .map((result: { id: any; title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal; poster_path: any; overview: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal} , index) => (
              <div
                key={nanoid()}
                className="col-md-2 text-truncated card rounded shadow border overflow-hidden d-flex mx-1 my-2 pb-3"
              >
                <div className="card-body">
                <Link className="h6 font-weight-bold text-truncate text-dark pt-2" 
                to={`/film/${result.id}`}>{result.title}</Link>
                  <img
                    src={`https://image.tmdb.org/t/p/w92${result.poster_path}`}
                    alt="cap"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default SearchResults;

interface ParamsProps {
  searchTerm: string;
};

interface SearchResults {
  searchTerm: string;
};
