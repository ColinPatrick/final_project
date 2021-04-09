import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
  useHistory,
} from "react-router-dom";

// import './SearchBarStyles.css'

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();

  // const handleHistory = () => {
  //   history.push('/search')
  // }

  // const handleSumbit = e => {
  //   e.preventDefault();
  // }

  return (
    <div
      id="search-bar"
      className="font-weight-light mx-4 border-bottom border-primary font-weight-bold"
    >
      <input
        className="form-control"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={e => {e.key === "Enter" ? history.push(`/search/${searchTerm}`) : null}}
        placeholder="Explore films"
      />
      <Link to={`/search/${searchTerm}`}>
        <button type="button" className="btn btn-primary align-center">
          Search
        </button>
      </Link>
    </div>
  );
};

export default SearchBar;

// const SearchBar = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const history = useHistory();
//   const [autocomplete, setAutocomplete] = useState([]);
//   const handleHistory = () => {
//     setSearchTerm("");
//     history.push("/");
//   };

//   const getMovies = async () => {
//     const fetchData = await fetch(
//       `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${searchTerm}&page=1&include_adult=false`
//     ).then((res) => res.json().then((res) => setAutocomplete(res)));
//     console.log(fetchData);
//   };y

//   const key = `14257b7461dc5f7e2f6cf229f055bf83`;
//   return (
//     <div
//       id="search-bar"
//       className="font-weight-light mx-4 border-bottom border-primary font-weight-bold"
//     >
//       <ReactLiveSearch
//         className="form-control form-control-md"
//         value={searchTerm}
//         // onChange={(e) => setSearchTerm(e.target.value)}
//         placeholder="Explore films"
//         data={["one", "two", ]}
//       />

//       <Link to={`/${searchTerm}`}>
//         <button
//           type="submit"
//           className="btn btn-primary"
//           onChange={handleHistory}
//         >
//           Search
//         </button>
//       </Link>
//     </div>
//   );
// };

// export default SearchBar;

{
  /* <input
        className="form-control form-control-md"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Explore films"
      /> */
}

//history.push
// const Search = (props) => {
//     const [searchValue, setSearchValue] = useState("");

//     const handleSearchInputChanges = (e) => {
//       setSearchValue(e.target.value);
//     }

//     const resetInputField = () => {
//       setSearchValue("")
//     }

//     const callSearchFunction = (e) => {
//       e.preventDefault();
//       props.search(searchValue);
//       resetInputField();
//     }

//     return (
//         <form className="search">
//           <input
//             value={searchValue}
//             onChange={handleSearchInputChanges}
//             type="text"
//           />
//           <input onClick={callSearchFunction} type="submit" value="SEARCH" />
//         </form>
//       );
//   }
