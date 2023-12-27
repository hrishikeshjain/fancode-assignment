import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ENDPOINT_URL, TMDB_V3_API_KEY } from "../../constants";
import { MovieDetail } from "../../types/Movies";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_ENDPOINT_URL,
  }),
  // tagTypes: ["EvalFailure", "EvalRunId"],
  endpoints: (builder) => ({
    getGenres: builder.query({
      query: () => ({
        url: `/genre/movie/list`,
        params: { api_key: TMDB_V3_API_KEY },
      }),
      transformResponse: (response: { genres: [] }) => response.genres,
    }),
    getMovies: builder.query({
      query: ({ releaseYear, genre }) => {
        return {
          url: `discover/movie`,
          params: {
            api_key: TMDB_V3_API_KEY,
            sort_by: "popularity.desc",
            primary_release_year: releaseYear,
            page: 1,
            with_genres: genre,
            "vote_count.gte": 300,
          },
        };
      },
      transformResponse: (response: { results: MovieDetail[] }) => response,
    }),
    getSearchedMovies: builder.query({
      query: ({ movieName, page }) => {
        return {
          url: `search/movie`,
          params: {
            api_key: TMDB_V3_API_KEY,
            page: page,
            include_adult: true,
            query: movieName,
          },
        };
      },
      transformResponse: (response: { results: MovieDetail[] }) => response,
    }),
  }),
});

export const {
  useGetGenresQuery,
  useLazyGetMoviesQuery,
  useLazyGetSearchedMoviesQuery,
} = apiSlice;
