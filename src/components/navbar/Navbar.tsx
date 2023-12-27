import SearchIcon from "@mui/icons-material/Search";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import slugify from "react-slugify";

function Navbar() {
  const [searchedMovie, setSearchedMovie] = useState("");

  const navigate = useNavigate();
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (searchedMovie !== "") {
        navigate(`/search/${slugify(searchedMovie)}`);
      }
    }
  };

  return (
    <nav className="navbar">
      <div className="site__title">
        <Link to={"/browse"}>
          <h3>MOVIEFIX</h3>
        </Link>
      </div>
      <div className="search__movie__input">
        <SearchIcon className="search__icon" />
        <input
          value={searchedMovie}
          onChange={(e) => setSearchedMovie(e.target.value)}
          type="text"
          onKeyDown={handleSearch}
          placeholder="Search movie"
        />
      </div>
    </nav>
  );
}

export default Navbar;
