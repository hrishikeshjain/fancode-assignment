import { useCallback, useEffect, useRef, useState } from "react";
import { useLazyGetMoviesQuery } from "../../store/slices/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import MovieList from "../movieList/MovieList";
import "./Movies.css";
import { setMovieResults } from "../../store/slices/moviesSlice";

function Movies() {
  const { activeGenre } = useSelector((state: RootState) => state.genreSlice);

  const scrollToThisMovieRef = useRef<HTMLDivElement>(null);
  const { results } = useSelector((state: RootState) => state.moviesSlice);
  const [nextReleaseYear, setNextReleaseYear] = useState(2011);
  const [prevReleaseYear, setPrevReleaseYear] = useState(2012);

  const [trigger] = useLazyGetMoviesQuery();

  useEffect(() => {
    setTimeout(() => {
      if (scrollToThisMovieRef.current != null) {
        scrollToThisMovieRef.current.scrollIntoView({ block: "center" });
      }
    }, 200);
  }, [activeGenre]);
  const dispatch = useDispatch();

  useEffect(() => {
    setPrevReleaseYear(2012);
    setNextReleaseYear(2012);
    dispatch(setMovieResults([]));
    handlePrev(2012);
  }, [activeGenre]);

  function scrollToView() {
    scrollToThisMovieRef?.current?.scrollIntoView({
      block: "start",
    });
  }

  const handleNext = useCallback(
    (releaseYear: number) => {
      if (releaseYear <= new Date().getFullYear()) {
        trigger({ releaseYear: releaseYear, genre: activeGenre });
      }
    },
    [activeGenre, trigger]
  );

  const handlePrev = useCallback(
    (releaseYear: number) => {
      trigger({ releaseYear: releaseYear, genre: activeGenre }).then(() =>
        scrollToView()
      );
    },
    [activeGenre, trigger]
  );

  return (
    <div className="movies__list">
      <MovieList
        handleNext={handleNext}
        nextReleaseYear={nextReleaseYear}
        prevReleaseYear={prevReleaseYear}
        handlePrev={handlePrev}
        results={results}
        setNextReleaseYear={setNextReleaseYear}
        setPrevReleaseYear={setPrevReleaseYear}
        scrollToThisMovieRef={scrollToThisMovieRef}
      />
    </div>
  );
}

export default Movies;
