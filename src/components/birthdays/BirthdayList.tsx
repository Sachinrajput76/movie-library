"use client";
import Link from "next/link";
import { useBirthdays } from "./context";
import { Profile } from "@/utils/birthdays/types";
import BirthdayCard from "./BirthdayCard";

export default function BirthdayList() {
    const { profiles, filter, query, setProfiles } = useBirthdays();

    const visible = profiles.filter(p =>
        (filter === "All" || p.category === filter) &&
        (!query.trim() || p.name.toLowerCase().includes(query.toLowerCase()))
    );

    const remove = (id: string) => {
        if (!confirm("Delete this profile?")) return;
        const next = profiles.filter(p => p.id !== id);
        setProfiles(next);
    };

    return (
        <div className="p-6">
            {/* Toolbar */}
            <div className="flex justify-end mb-4">
                <Link
                    href="/birthdays/add"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition"
                >
                    + Add Person
                </Link>
            </div>

            {/* List */}
            {visible.length === 0 ? (
                <p className="text-gray-500 text-center">No profiles yet.</p>
            ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {visible.map((p: Profile) => (
                        <BirthdayCard key={p.id} profile={p} onDelete={() => remove(p.id)} />
                    ))}
                </ul>
            )}
        </div>
    );
}
