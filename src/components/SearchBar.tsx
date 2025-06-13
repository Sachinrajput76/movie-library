"use client";

import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { X } from "lucide-react";

type Props = {
    initialTerm?: string;
    onSearch: (searchTerm: string) => void;
};

export default function SearchBar({ onSearch, initialTerm = "" }: Props) {
    const [search, setSearch] = useState(initialTerm);
    const debounced = useDebounce(search, 500);

    useEffect(() => {
        onSearch(debounced);
    }, [debounced]);

    const handleClear = () => {
        setSearch("");
    };

    return (
        <div className="relative w-full">
            <input
                type="text"
                placeholder="Search movies..."
                className="w-full p-3 pr-10 border rounded-lg shadow"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
                <button
                    onClick={handleClear}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800 cursor-pointer"
                    aria-label="Clear search"
                >
                    <X className="w-5 h-5" />
                </button>
            )}
        </div>
    );
}
