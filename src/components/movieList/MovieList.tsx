import { useEffect, useRef } from "react";
import MovieCard from "../movieCard/MovieCard";
import { useDispatch } from "react-redux";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import { setIsTopUpScroll } from "../../store/slices/moviesSlice";
import { MovieDetail } from "../../types/Movies";
import "./MovieList.css";
import { Box } from "@mui/material";

interface MovieListProps {
  handleNext: (page: number) => void;
  handlePrev: (page: number) => void;
  nextReleaseYear: number;
  prevReleaseYear: number;
  results: MovieDetail[];
  setNextReleaseYear: (year: number) => void;
  setPrevReleaseYear: (year: number) => void;
  scrollToThisMovieRef: React.RefObject<HTMLDivElement>;
}

function MovieList({
  results,
  handleNext,
  handlePrev,
  nextReleaseYear,
  prevReleaseYear,
  setNextReleaseYear,
  setPrevReleaseYear,
  scrollToThisMovieRef,
}: MovieListProps) {
  const bottomIntersectionRef = useRef<HTMLDivElement>(null);
  const topIntersectionRef = useRef<HTMLDivElement>(null);

  const bottomIntersection = useIntersectionObserver(bottomIntersectionRef, {
    root: null,
    rootMargin: "-10px",
    threshold: 1,
  });
  const topIntersection = useIntersectionObserver(topIntersectionRef, {
    root: null,
    rootMargin: "0px",
    threshold: 0,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      bottomIntersection &&
      bottomIntersection.intersectionRatio === 1 &&
      results.length > 0
    ) {
      dispatch(setIsTopUpScroll(false));
      setNextReleaseYear(nextReleaseYear + 1);
      handleNext(nextReleaseYear + 1);
    }
  }, [bottomIntersection]);

  useEffect(() => {
    if (topIntersection && topIntersection.intersectionRatio === 1) {
      dispatch(setIsTopUpScroll(true));
      setPrevReleaseYear(prevReleaseYear - 1);
      handlePrev(prevReleaseYear - 1);
    }
  }, [topIntersection]);

  const geReleaseYear = (movie: MovieDetail) => {
    const releaseDate = movie.release_date;
    return parseInt(releaseDate.slice(0, 4));
  };

  return (
    <>
      <Box sx={{ display: "hidden" }} ref={topIntersectionRef} />
      {results?.map((movie, index) => {
        let movieReleaseYear: JSX.Element | undefined;

        /* below condition is to add movie release year only when 20 records are rendred */
        if (index % 20 === 0 && index !== 0) {
          movieReleaseYear = (
            <h1 className="movie__release__year">{geReleaseYear(movie)}</h1>
          );
        }

        let processedHtml: JSX.Element = (
          <>
            {movieReleaseYear}
            <MovieCard movie={movie} key={movie.id} />
          </>
        );

        /* below condition is to set scroll to last movie on first site load when only 20 records are loaded */
        if (index === 17 && results.length === 20) {
          processedHtml = (
            <>
              {movieReleaseYear}
              <div id={`${index}`} ref={scrollToThisMovieRef}></div>
              <MovieCard movie={movie} key={movie.id} />
            </>
          );
        }

        /* below condition is to set scroll to this movie when user scrolls up after first site load*/
        if (results.length > 20 && index === 20) {
          processedHtml = (
            <>
              {movieReleaseYear}
              <div id={`${index}`} ref={scrollToThisMovieRef}></div>
              <MovieCard movie={movie} key={movie.id} />
            </>
          );
        }
        return processedHtml;
      })}
      <Box sx={{ display: "block", height: "" }} ref={bottomIntersectionRef} />
      {/* <div ref={bottomIntersectionRef}></div> */}
    </>
  );
}

export default MovieList;
