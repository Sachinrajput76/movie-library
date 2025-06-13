"use client";
import { RootState } from "@/store";
import { removeFavorite } from "@/store/favoritesSlice";
import { Film, Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

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
            <div className="flex justify-center">
                <h1 className="flex items-center gap-2 text-xl font-bold mb-4">
                    <Film />
                    <span>Favorite Movies</span>
                </h1>
            </div>
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
                            className={"cursor-pointer absolute top-2 right-2 transition-colors text-red-600 border-red-600"
                            }

                        >
                            <Heart fill={"red"} className="w-6 h-6" />
                        </button>


                    </div>
                ))}
            </div>
        </main>
    );
};

export default FavoritesPage;
