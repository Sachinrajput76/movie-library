import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { addFavorite, removeFavorite } from "@/store/favoritesSlice";

const MovieCard = ({ movie }: { movie: any }) => {
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
            <Image
                src={movie.Poster !== "N/A" ? movie.Poster : "/fallback.jpg"}
                alt={movie.Title}
                width={300}
                height={450}
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
