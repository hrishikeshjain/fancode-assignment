import { LazyLoadImage } from "react-lazy-load-image-component";
import logo from "../../assets/no-image.jpg";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Genre, MovieDetail } from "../../types/Movies";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./MoviesCard.css";

interface MovieCardProps {
  movie: MovieDetail;
}
function MovieCard({ movie }: MovieCardProps) {
  const { genres } = useSelector((state: RootState) => state.genreSlice);

  const showMovieGenre = (movieGenres: number[]) => {
    const setOfNumbers = new Set(movieGenres);
    const genresName: Genre[] = genres.filter((elem: Genre) =>
      setOfNumbers.has(elem.id)
    );
    let genreString = "";
    genresName.forEach((genre, index) => {
      const addComma = index === genresName.length - 1 ? "" : ", ";
      genreString += genre.name + addComma;
    });

    return genreString;
  };

  return (
    <div className="movie__card">
      <div className="movie__card_info">
        <h1 className="movie__card_title">{movie.title}</h1>
        <h1 className="movie__card_genres">
          {showMovieGenre(movie.genre_ids)}
        </h1>
      </div>
      <div className="movie__poster_section">
        {movie.poster_path === null ? (
          <img className="movie__poster" src={logo} />
        ) : (
          <LazyLoadImage
            height={"100%"}
            effect="blur"
            className="movie__poster"
            src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
          />
        )}
      </div>
    </div>
  );
}

export default MovieCard;
