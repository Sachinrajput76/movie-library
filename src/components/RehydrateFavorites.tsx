"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/store";
import { setFavorites } from "@/store/favoritesSlice";

const RehydrateFavorites = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const stored = localStorage.getItem("favorites");
        if (stored) {
            dispatch(setFavorites(JSON.parse(stored)));
        }
    }, [dispatch]);

    return null;
};

export default RehydrateFavorites;
