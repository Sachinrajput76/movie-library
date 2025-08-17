"use client";
import BirthdayList from "@/components/birthdays/BirthdayList";
import { useBirthdays } from "@/components/birthdays/context";

export default function BirthdaysPageClient() {
    const { profiles } = useBirthdays();

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">🎉 Birthdays & Reminders</h1>

            {/* Debug: Show how many profiles are loaded */}
            <p className="text-sm text-gray-500">Profiles loaded: {profiles.length}</p>

            <BirthdayList />
        </div>
    );
}
