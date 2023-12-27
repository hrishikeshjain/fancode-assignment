import { useCallback, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useLazyGetSearchedMoviesQuery } from "../../store/slices/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../movieCard/MovieCard";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import "./SearchedMovies.css";
import { setResults } from "../../store/slices/searchMovieSlice";
import { RootState } from "../../store/store";
import { MovieDetail } from "../../types/Movies";

function SearchedMovies() {
  const { query } = useParams();
  const { results, page } = useSelector(
    (state: RootState) => state.searchMovieSlice
  );
  const [trigger] = useLazyGetSearchedMoviesQuery();
  const bottomIntersectionRef = useRef<HTMLDivElement>(null);
  const bottomIntersection = useIntersectionObserver(bottomIntersectionRef, {
    root: null,
    rootMargin: "100px",
    threshold: 1,
  });
  const dispatch = useDispatch();

  useEffect((): (() => void) => {
    trigger({ movieName: query, page: page });

    return () => dispatch(setResults([]));
  }, []);

  const handleNext = useCallback((page: number) => {
    trigger({ movieName: query, page: page });
  }, []);

  useEffect(() => {
    if (
      bottomIntersection &&
      bottomIntersection.intersectionRatio === 1 &&
      results.length > 0
    ) {
      handleNext(page);
    }
  }, [bottomIntersection]);

  return (
    <>
      <div className="searched__movie">Search results for {query}</div>
      <div className="movies__list">
        {results?.map((movie: MovieDetail) => {
          return (
            <>
              <MovieCard movie={movie} key={movie.id} />
            </>
          );
        })}
        <div className="" ref={bottomIntersectionRef}></div>
      </div>
    </>
  );
}

export default SearchedMovies;
