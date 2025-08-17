"use client";
import { useBirthdays } from "@/components/birthdays/context";
import BirthdayList from "@/components/birthdays/BirthdayList";

export default function BirthdaysPageClient() {
    const { profiles, setProfiles, filter, query } = useBirthdays();

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">🎉 Birthdays & Reminders</h1>

            {/* Debug: Show how many profiles are loaded */}
            <p className="text-sm text-gray-500">Profiles loaded: {profiles.length}</p>

            <BirthdayList
                profiles={profiles}
                setProfiles={setProfiles}
                filter={filter}
                query={query}
            />
        </div>
    );
}
