import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Movie {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
    Type: string;
}

interface FavoritesState {
    movies: Movie[];
}

const initialState: FavoritesState = {
    movies: [],
};

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        addFavorite: (state, action: PayloadAction<Movie>) => {
            if (!state.movies.some((m) => m.imdbID === action.payload.imdbID)) {
                state.movies.push(action.payload);
            }
        },
        removeFavorite: (state, action: PayloadAction<string>) => {
            state.movies = state.movies.filter((m) => m.imdbID !== action.payload);
        },
    },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
