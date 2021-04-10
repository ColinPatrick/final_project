import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const { searchTerm } = useParams<ParamsProps>();
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
    <>
    <div className="col-md text-grey bg-light mb-3" style={{ maxWidth: "18rem" }}>
      <h1 id="text-center search-result-text">Search Results: </h1>
      
      </div>
      <div className='d-flex flex-row flex-wrap justify-content-center'>
      {results.map((result, index) => (
        <div key={index} className="card m-3 movieCard">
        <div className="card-body">
          <Link className="h2"  to={`/film/${result.id}`}>
          <h2 className="card-title">{result.title}</h2> </Link>
          <img className="img-top" src={`https://image.tmdb.org/t/p/w92/${result.poster_path}`} alt="image cap" />
        </div>
      </div>
        // <div style={{ maxWidth: "18rem" }}>
        //   <img className="img-top" src={`https://image.tmdb.org/t/p/w92/${result.poster_path}`} alt="image cap" />
        //   <div className="body">
        //     {/* <h5 className="card-title">Card title</h5> */}
        //     <Link className="h2" key={index} to={`/film/${result.id}`}>
        //       {result.title}
        //     </Link>
        //     {/* <p className="card-text">
        //       {/* {result.overview} </p> */}
            
        //   </div>
        // </div>
        ))}
      </div>
</>
  );
};
{
  /* <>
      <h1 id="search-result-text">Search Results: </h1>
      {results.map(result => <Link className="h1" to={`/film/${result.id}`}>{result.title}</Link>)}
    </> */
}
//history.push

export default SearchResults;

interface ParamsProps {
  searchTerm: string;
}
interface SearchResults {
  searchTerm: string;
}
