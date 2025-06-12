"use client";

import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";

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
