"use client";

import SearchBar from "@/components/SearchBar";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { buildSearchUrl } from "@/utils/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { addFavorite, removeFavorite } from "@/store/favoritesSlice";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1); // ✅ Pagination state

  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.movies);

  const { data, isLoading } = useQuery({
    queryKey: ["movies", searchTerm, page],
    queryFn: () =>
      axios.get(buildSearchUrl(searchTerm, page)).then((res) => res.data),
    enabled: !!searchTerm,
  });

  const toggleFavorite = (movie: any) => {
    const isFav = favorites.some((fav) => fav.imdbID === movie.imdbID);
    isFav ? dispatch(removeFavorite(movie.imdbID)) : dispatch(addFavorite(movie));
  };

  const isMovieFavorite = (imdbID: string) =>
    favorites.some((fav) => fav.imdbID === imdbID);

  const totalResults = parseInt(data?.totalResults || "0", 10);
  const totalPages = Math.ceil(totalResults / 10);

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">🎬 Movie Library</h1>
      <SearchBar
        onSearch={(term) => {
          setSearchTerm(term);
          setPage(1); // Reset to first page on new search
        }}
      />
      {isLoading && <p className="mt-4 text-center">Loading...</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
        {data?.Search?.map((movie: any) => {
          const isFav = isMovieFavorite(movie.imdbID);
          return (
            <div key={movie.imdbID} className="bg-white p-2 rounded shadow relative">
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
                onClick={() => toggleFavorite(movie)}
                className="absolute top-2 right-2 text-xl"
                title={isFav ? "Remove from favorites" : "Add to favorites"}
              >
                {isFav ? "❤️" : "🤍"}
              </button>
            </div>
          );
        })}
      </div>

      {/* ✅ Pagination Buttons */}
      {totalResults > 10 && (
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="self-center">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
}
