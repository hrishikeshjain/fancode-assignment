import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import genreSlice from "./slices/genreSlice";
import moviesSlice from "./slices/moviesSlice";
import searchMovieSlice from "./slices/searchMovieSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    genreSlice: genreSlice,
    moviesSlice: moviesSlice,
    searchMovieSlice: searchMovieSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
