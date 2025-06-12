import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Movie {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
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
            const exists = state.movies.find((m) => m.imdbID === action.payload.imdbID);
            if (!exists) {
                state.movies.push(action.payload);
                localStorage.setItem("favorites", JSON.stringify(state.movies));
            }
        },
        removeFavorite: (state, action: PayloadAction<string>) => {
            state.movies = state.movies.filter((m) => m.imdbID !== action.payload);
            localStorage.setItem("favorites", JSON.stringify(state.movies));
        },
        setFavorites: (state, action: PayloadAction<Movie[]>) => {
            state.movies = action.payload;
        },
    },
});

export const { addFavorite, removeFavorite, setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
