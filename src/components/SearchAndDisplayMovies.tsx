"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";
import MovieCard from "@/components/MovieCard";
import { buildSearchUrl } from "@/utils/api";

export default function SearchAndDisplayMovies({ initialData, initialSearchValue }: any) {
    const [searchTerm, setSearchTerm] = useState(initialSearchValue);
    const [page, setPage] = useState(1);

    const shouldFetch = searchTerm.trim() !== "";

    const { data, isFetching } = useQuery({
        queryKey: ["movies", searchTerm, page],
        queryFn: () =>
            axios.get(buildSearchUrl(searchTerm, page)).then((res) => res.data),
        initialData: page === 1 && searchTerm === initialSearchValue ? initialData : undefined,
        enabled: shouldFetch,
    });

    const totalResults = parseInt(data?.totalResults || "0", 10);
    const totalPages = Math.ceil(totalResults / 10);
    const noResults = data?.Response === "False";

    return (
        <>
            <SearchBar
                initialSearchValue={initialSearchValue}
                onSearch={(term) => {
                    setSearchTerm(term);
                    setPage(1);
                }}
            />

            {isFetching && <p className="text-center mt-4">Loading...</p>}

            {!isFetching && !shouldFetch && (
                <p className="text-center mt-4 text-gray-500">
                    🔍 Search a movie to begin and save it to your favorites.
                </p>
            )}

            {!isFetching && shouldFetch && noResults && (
                <p className="text-center mt-4 text-red-500">No movies found.</p>
            )}

            {shouldFetch && !noResults && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
                    {data?.Search?.map((movie: any) => (
                        <MovieCard key={movie.imdbID} movie={movie} />
                    ))}
                </div>
            )}

            {shouldFetch && !noResults && totalPages > 1 && (
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={(newPage) => setPage(newPage)}
                />
            )}
        </>
    );
}
