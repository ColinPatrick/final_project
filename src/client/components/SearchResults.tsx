import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const { searchTerm } = useParams();
  // const key = process.env.REACT_APP_Movie_DB_API_Key;
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
    <div className="card text-white bg-dark mb-3" style={{ maxWidth: "18rem" }}>
      <h1 id="search-result-text">Search Results: </h1>
      {results.map((result, index) => <Link key={index} className="h1" to={`/film/${result.id}`}>{result.title}</Link>)}
      </div>
  );
};
{/* <>
      <h1 id="search-result-text">Search Results: </h1>
      {results.map(result => <Link className="h1" to={`/film/${result.id}`}>{result.title}</Link>)}
    </> */}
//history.push

export default SearchResults;

interface SearchResults {
  searchTerm: string;
}
