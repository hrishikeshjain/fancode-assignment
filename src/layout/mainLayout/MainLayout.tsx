import GenreFilter from "../../components/genreFilter/GenreFilter";
import Movies from "../../components/movies/Movies";
import Navbar from "../../components/navbar/Navbar";
import "./MainLayout.css";

function MainLayout() {
  return (
    <>
      <div className="movies__header">
        <Navbar />
        <GenreFilter />
      </div>
      <Movies />
    </>
  );
}

export default MainLayout;
