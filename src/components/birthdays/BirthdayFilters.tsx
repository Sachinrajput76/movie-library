"use client";
import { useBirthdays } from "./context";

const categories = ["All", "Family", "Relatives", "Friends", "Important", "Others"] as const;

export default function BirthdayFilters() {
    const { filter, setFilter, query, setQuery } = useBirthdays();

    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            {/* Category Filter */}
            <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Category</label>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as any)}
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {categories.map((c) => (
                        <option key={c} value={c}>
                            {c}
                        </option>
                    ))}
                </select>
            </div>

            {/* Search Box */}
            <input
                className="w-full md:w-64 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search by name…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
        </div>
    );
}
