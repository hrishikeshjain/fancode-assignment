import { useDispatch, useSelector } from "react-redux";
import { useGetGenresQuery } from "../../store/slices/apiSlice";
import "./GenreFilter.css";
import { setActiveGenres, setGenres } from "../../store/slices/genreSlice";
import { RootState } from "../../store/store";
import { useEffect } from "react";

interface genreInterface {
  id: number;
  name: string;
}

function GenreFilter() {
  const { data: genres, isLoading } = useGetGenresQuery(undefined);
  const { activeGenre } = useSelector((state: RootState) => state.genreSlice);
  const dispatch = useDispatch();
  const toggleActiveGenres = (id: number) => {
    if (activeGenre === id) {
      return;
    } else {
      dispatch(setActiveGenres(id));
    }
  };

  useEffect(() => {
    if (!isLoading) {
      dispatch(setGenres(genres));
    }
  }, [isLoading]);

  return (
    <div className="genres__section">
      {genres &&
        genres?.map((genre: genreInterface) => (
          <button
            onClick={() => toggleActiveGenres(genre.id)}
            className={`${
              activeGenre === genre.id ? "genre_selected" : ""
            } genre__button`}
            key={genre.id}
          >
            {genre.name}
          </button>
        ))}
    </div>
  );
}

export default GenreFilter;
