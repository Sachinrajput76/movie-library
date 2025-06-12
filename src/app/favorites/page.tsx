"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { removeFavorite } from "@/store/favoritesSlice";

const FavoritesPage = () => {
    const dispatch = useDispatch();
    const favorites = useSelector((state: RootState) => state.favorites.movies);

    const handleRemove = (imdbID: string) => {
        dispatch(removeFavorite(imdbID));
    };

    if (!favorites.length)
        return <p className="text-center mt-10 text-lg">No favorites yet.</p>;

    return (
        <main className="max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">❤️ Favorite Movies</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {favorites.map((movie) => (
                    <div key={movie.imdbID} className="bg-white p-2 rounded shadow relative">
                        <img
                            src={movie.Poster}
                            alt={movie.Title}
                            className="w-full h-64 object-cover rounded"
                        />
                        <div className="mt-2 text-center">
                            <h3 className="text-lg font-semibold">{movie.Title}</h3>
                            <p className="text-sm text-gray-500">{movie.Year}</p>
                        </div>
                        <button
                            onClick={() => handleRemove(movie.imdbID)}
                            className="absolute top-2 right-2 text-xl"
                            title="Remove from favorites"
                        >
                            ❤️
                        </button>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default FavoritesPage;
