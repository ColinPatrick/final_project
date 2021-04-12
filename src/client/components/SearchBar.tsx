import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
  useHistory,
} from "react-router-dom";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();

  return (
    <div
      id="search-bar"
      className="font-weight-light mx-4 d-flex flex-row font-weight-bold"
    >
      <input
        className="form-control mx-1"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={e => {e.key === "Enter" ? history.push(`/search/${searchTerm}`) : null}}
        placeholder="Explore films"
      />
      <Link to={`/search/${searchTerm}`}>
        <button type="button" className="btn btn-primary align-center mx-1">
          Search
        </button>
      </Link>
    </div>
  );
};

export default SearchBar;

