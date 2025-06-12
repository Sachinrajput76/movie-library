import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favoritesSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
    reducer: {
        favorites: favoritesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
