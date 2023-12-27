import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeGenre: 28, // set Action as the default genre
  genres: [],
};

const genreSlice = createSlice({
  name: "genreSlice",
  initialState,
  reducers: {
    setActiveGenres(state, action) {
      state.activeGenre = action.payload;
    },
    setGenres(state, action) {
      state.genres = action.payload;
    },
  },
});

export const { setActiveGenres, setGenres } = genreSlice.actions;
export default genreSlice.reducer;
