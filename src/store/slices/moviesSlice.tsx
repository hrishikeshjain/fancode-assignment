import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { MovieDetail } from "../../types/Movies";

interface initialStateInterface {
  results: MovieDetail[];
  releaseYear: number;
  isTopUpScroll: boolean;
}
export const initialState: initialStateInterface = {
  results: [],
  releaseYear: 2012,
  isTopUpScroll: false,
};

const moviesSlice = createSlice({
  name: "moviesSlice",
  initialState,
  reducers: {
    setIsTopUpScroll: (state, action) => {
      state.isTopUpScroll = action.payload;
    },
    setMovieResults: (state, action) => {
      state.results = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      apiSlice.endpoints.getMovies.matchFulfilled,
      (state, action) => {
        const { results } = action.payload;
        if (state.isTopUpScroll) {
          state.results = results.concat(state.results);
        } else {
          state.results = state.results.concat(results);
        }
      }
    );
  },
});
export const { setIsTopUpScroll, setMovieResults } = moviesSlice.actions;
export default moviesSlice.reducer;
