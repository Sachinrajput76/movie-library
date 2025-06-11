"use client";

import SearchBar from "@/components/SearchBar";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { buildSearchUrl } from "@/utils/api";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["movies", searchTerm],
    queryFn: () =>
      axios.get(buildSearchUrl(searchTerm)).then((res) => res.data),
    enabled: !!searchTerm,
  });

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">🎬 Movie Library</h1>
      <SearchBar onSearch={setSearchTerm} />
      {isLoading && <p className="mt-4">Loading...</p>}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
        {data?.Search?.map((movie: any) => (
          <div key={movie.imdbID} className="bg-white p-2 rounded shadow">
            <img src={movie.Poster} alt={movie.Title} className="w-full h-64 object-cover" />
            <div className="mt-2 text-center">
              <h2 className="text-lg font-semibold">{movie.Title}</h2>
              <p className="text-sm text-gray-500">{movie.Year}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
