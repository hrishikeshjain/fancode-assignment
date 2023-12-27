import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { MovieDetail } from "../../types/Movies";

interface initialStateInterface {
  results: MovieDetail[];
  page: number;
}

export const initialState: initialStateInterface = {
  results: [],
  page: 1,
};

const moviesSlice = createSlice({
  name: "moviesSlice",
  initialState,
  reducers: {
    setResults: (state, action) => {
      state.results = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      apiSlice.endpoints.getSearchedMovies.matchFulfilled,
      (state, action) => {
        const { results } = action.payload;
        state.results = state.results.concat(results);
        state.page = state.page + 1;
      }
    );
  },
});

export const { setResults } = moviesSlice.actions;
export default moviesSlice.reducer;
