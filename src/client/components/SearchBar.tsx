import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Link, Route, useHistory } from "react-router-dom";

// import './SearchBarStyles.css'

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();
  const handleHistory = () => {
    history.push('/')
  }

  return (
    <div id="search-bar" className="col col-sm-4">
      <input
        className="form-control"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Explore films"
      />
      <Link to={`/${searchTerm}`}>
        <button onClick={handleHistory}>Search</button>
      </Link>
    </div>
  );
};

export default SearchBar;
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
