"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { getById } from "@/utils/birthdays/storage";
import { Profile, YearNote } from "@/utils/birthdays/types";
import {
    ageOnDate,
    formatDate,
    groupNotesByYear,
    nextBirthdayDate,
} from "@/utils/birthdays/helpers";
import { themeStyle, loadGlobalTheme, ThemeKey } from "@/utils/birthdays/themes"; // Import ThemeKey type
import NotesHistory from "@/components/birthdays/NotesHistory";
import ShareButtons from "@/components/birthdays/ShareButtons";
import PrivacyBadge from "@/components/birthdays/PrivacyBadge";
import AudioPlayer from "@/components/birthdays/AudioPlayer";

export default function BirthdayProfilePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    // ✅ unwrap params using React.use
    const { id } = React.use(params);
    const [p, setP] = useState<Profile | null>(null);
    const [note, setNote] = useState("");
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const globalTheme = loadGlobalTheme();

    useEffect(() => {
        setP(getById(id) ?? null);
    }, [id]);

    // Fix: Ensure cardTheme is of type ThemeKey | undefined
    const cardTheme = useMemo<ThemeKey | undefined>(() => {
        const theme = p?.theme || globalTheme;
        // Convert to lowercase to match ThemeKey type if needed
        return theme?.toLowerCase() as ThemeKey;
    }, [p, globalTheme]);

    if (!p) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
                <p className="text-gray-600 text-lg">Profile not found.</p>
            </main>
        );
    }

    const shareText = `🎂 ${p.name}'s birthday is on ${new Date(
        p.dob
    ).toLocaleDateString()} — turns ${ageOnDate(p.dob, nextBirthdayDate(p.dob)) + 1
        } on ${formatDate(nextBirthdayDate(p.dob))}.`;

    const addNote = () => {
        if (!note.trim()) return;
        const now = new Date();
        const yn: YearNote = {
            year: now.getFullYear(),
            text: note.trim(),
            createdAt: now.toISOString(),
        };
        const updated = { ...p, notes: [yn, ...(p.notes || [])] };
        setP(updated);
        // persist to localStorage
        const all = JSON.parse(
            localStorage.getItem("birthday_profiles_v1") || "[]"
        );
        const idx = all.findIndex((x: Profile) => x.id === p.id);
        if (idx > -1) {
            all[idx] = updated;
            localStorage.setItem("birthday_profiles_v1", JSON.stringify(all));
        }
        setNote("");
    };

    return (
        <main
            className="min-h-screen flex justify-center items-start bg-gray-100 p-6"
            style={themeStyle(cardTheme)} // Now cardTheme is of type ThemeKey | undefined
        >
            <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 space-y-6">
                {/* Header */}
                <div className="flex gap-6">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                        {p.photoDataUrl ? (
                            <img
                                src={p.photoDataUrl}
                                alt={p.name}
                                className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                            />
                        ) : (
                            <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-3xl font-bold text-white">
                                {p.name.slice(0, 1).toUpperCase()}
                            </div>
                        )}
                    </div>
                    {/* Meta */}
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold">{p.name}</h1>
                            <PrivacyBadge isPublic={p.isPublic} />
                        </div>
                        <p className="text-gray-600 mt-1">
                            🎂 {new Date(p.dob).toLocaleDateString()} · next:{" "}
                            {formatDate(nextBirthdayDate(p.dob))}
                        </p>
                        <p className="text-gray-500 mt-1">Category: {p.category}</p>
                        <div className="mt-3">
                            <ShareButtons profile={p} />
                        </div>
                    </div>
                </div>
                {/* Audio Row */}
                {p.audioDataUrl && (
                    <div>
                        <AudioPlayer src={p.audioDataUrl} audioRef={audioRef} />
                    </div>
                )}
                {/* Notes Section */}
                <section>
                    <h2 className="text-xl font-semibold mb-3">
                        📒 Notes & Memories
                    </h2>
                    {/* Add Note */}
                    <div className="space-y-3 mb-6">
                        <textarea
                            placeholder="Add a memory for this year…"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            className="w-full border rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            onClick={addNote}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Add Note
                        </button>
                    </div>
                    {/* Notes History */}
                    <NotesHistory groups={groupNotesByYear(p.notes || [])} />
                </section>
            </div>
        </main>
    );
}