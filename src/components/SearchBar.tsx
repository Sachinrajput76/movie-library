"use client";

import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";

type Props = {
    onSearch: (searchTerm: string) => void;
};

export default function SearchBar({ onSearch }: Props) {
    const [search, setSearch] = useState("");
    const debounced = useDebounce(search, 500);

    // Notify parent when debounced value changes
    useEffect(() => {
        if (debounced.trim()) {
            onSearch(debounced);
        }
    }, [debounced]);

    return (
        <input
            type="text"
            placeholder="Search movies..."
            className="w-full p-3 border rounded-lg shadow"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
    );
}
