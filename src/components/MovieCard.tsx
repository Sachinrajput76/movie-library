import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { addFavorite, removeFavorite } from "@/store/favoritesSlice";
import { Heart } from "lucide-react";
import clsx from "clsx"; // optional utility for cleaner class handling

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

            <div className="mt-2 text-left space-y-1 px-2">
                <p className="text-sm text-gray-700">
                    <span className="font-semibold">Name:</span> {movie.Title}
                </p>
                <p className="text-sm text-gray-700">
                    <span className="font-semibold">Rating:</span> {movie?.Rating || "N/A"}
                </p>
                <p className="text-sm text-gray-700">
                    <span className="font-semibold">Year:</span> {movie.Year}
                </p>
            </div>


            <button
                onClick={toggleFavorite}
                className={clsx(
                    "absolute top-2 right-2 transition-colors cursor-pointer",
                    isFav
                        ? "text-red-600 border-red-600"
                        : "text-white border-gray-300 bg-black/30 hover:border-gray-500"
                )}
                title={isFav ? "Remove from favorites" : "Add to favorites"}
            >
                <Heart fill={isFav ? "red" : "white"} className="w-6 h-6" />
            </button>
        </div>
    );
};

export default MovieCard;
