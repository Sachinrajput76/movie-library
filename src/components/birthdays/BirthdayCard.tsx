"use client";
import Link from "next/link";
import { Profile } from "@/utils/birthdays/types";
import { ageOnDate, formatDate, nextBirthdayDate } from "@/utils/birthdays/helpers";
import ShareButtons from "./ShareButtons";
import PrivacyBadge from "./PrivacyBadge";
import { themeVars } from "@/utils/birthdays/themes";

export default function BirthdayCard({
    profile,
    onDelete,
}: {
    profile: Profile;
    onDelete: () => void;
}) {
    const nb = nextBirthdayDate(profile.dob);

    // Pick theme styles from themeVars
    const theme = profile.theme ? themeVars[profile.theme] : themeVars["Confetti"];

    return (
        <li
            className={`relative flex flex-col gap-4 p-4 rounded-lg shadow ${theme.bg} ${theme.text}`}
        >
            {/* Clickable overlay link */}
            <Link href={`/birthdays/${profile.id}`} className="absolute inset-0 z-0" />

            {/* Avatar */}
            {profile.photoDataUrl ? (
                <img
                    src={profile.photoDataUrl}
                    alt={profile.name}
                    className="w-16 h-16 rounded-full object-cover z-10"
                />
            ) : (
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-200 text-lg font-bold text-gray-700 z-10">
                    {profile.name.slice(0, 1).toUpperCase()}
                </div>
            )}

            {/* Info */}
            <div className="flex-1 z-10">
                <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">{profile.name}</h3>
                    <PrivacyBadge isPublic={profile.isPublic} />
                </div>
                <p className="text-sm">
                    🎂 {new Date(profile.dob).toLocaleDateString()} · turns{" "}
                    {ageOnDate(profile.dob, nb) + 1} on {formatDate(nb)}
                </p>
                <p className="text-sm">Category: {profile.category}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2 z-10">
                <Link
                    href={`/birthdays/${profile.id}`}
                    className="px-3 py-1 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
                >
                    Open
                </Link>
                <Link
                    href={{ pathname: "/birthdays/add", query: { edit: profile.id } }}
                    className="px-3 py-1 rounded bg-yellow-500 text-white text-sm hover:bg-yellow-600"
                >
                    Edit
                </Link>
                <button
                    onClick={onDelete}
                    className="px-3 py-1 rounded bg-red-600 text-white text-sm hover:bg-red-700"
                >
                    Delete
                </button>
                <ShareButtons profile={profile} compact />
            </div>
        </li>
    );
}
