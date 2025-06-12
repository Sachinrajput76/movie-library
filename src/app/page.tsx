"use client";

import SearchBar from "@/components/SearchBar";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { buildSearchUrl } from "@/utils/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { addFavorite, removeFavorite } from "@/store/favoritesSlice";
import Pagination from "@/components/Pagination";
import MovieCard from "@/components/MovieCard";

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
        {data?.Search?.map((movie: any) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>

      {totalResults > 10 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />
      )}
    </main>
  );
}
