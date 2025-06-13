"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import dynamic from "next/dynamic";
import SearchBar from "@/components/SearchBar";
import { buildSearchUrl } from "@/utils/api";
import { Search } from "lucide-react";

// Dynamic imports with better fallback UI and SSR disabled
const MovieCard = dynamic(() => import("@/components/MovieCard"), {
    loading: () => (
        <div className="animate-pulse bg-white p-2 rounded shadow">
            <div className="w-full h-64 bg-gray-200 rounded mb-2" />
            <div className="space-y-2 px-2">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            </div>
        </div>
    ),
    ssr: false,
});

const Pagination = dynamic(() => import("@/components/Pagination"), {
    loading: () => (
        <div className="flex justify-center mt-6">
            <div className="w-48 h-10 bg-gray-200 animate-pulse rounded" />
        </div>
    ),
    ssr: false,
});

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
                <div className="flex items-center gap-2 justify-center mt-4 text-gray-500">
                    <Search className="w-5 h-5" />
                    <p>Search a movie to begin and save it to your favorites.</p>
                </div>
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
