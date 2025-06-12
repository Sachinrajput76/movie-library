"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { addFavorite, removeFavorite } from "@/store/favoritesSlice";

type Movie = {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
};

type MovieCardProps = {
    movie: Movie;
};

const MovieCard = ({ movie }: MovieCardProps) => {
    const dispatch = useDispatch();
    const favorites = useSelector((state: RootState) => state.favorites.movies);

    const isFav = favorites.some((fav) => fav.imdbID === movie.imdbID);

    const toggleFavorite = () => {
        isFav
            ? dispatch(removeFavorite(movie.imdbID))
            : dispatch(addFavorite(movie));
    };

    return (
        <div className="bg-white p-2 rounded shadow relative">
            <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full h-64 object-cover rounded"
            />
            <div className="mt-2 text-center">
                <h2 className="text-lg font-semibold">{movie.Title}</h2>
                <p className="text-sm text-gray-500">{movie.Year}</p>
            </div>
            <button
                onClick={toggleFavorite}
                className="absolute top-2 right-2 text-xl"
                title={isFav ? "Remove from favorites" : "Add to favorites"}
            >
                {isFav ? "❤️" : "🤍"}
            </button>
        </div>
    );
};

export default MovieCard;
