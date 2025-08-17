"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Profile, Category } from "@/utils/birthdays/types";
import { loadAll, saveAll } from "@/utils/birthdays/storage";
import { nextBirthdayDate } from "@/utils/birthdays/helpers";
import { loadGlobalTheme, saveGlobalTheme, ThemeKey } from "@/utils/birthdays/themes";

type Ctx = {
    profiles: Profile[];
    setProfiles: (x: Profile[]) => void;
    filter: Category | "All";
    setFilter: (f: Category | "All") => void;
    query: string;
    setQuery: (q: string) => void;
    globalTheme: ThemeKey;
    updateGlobalTheme: (t: ThemeKey) => void;
    pageTheme: ThemeKey | null;  // <-- NEW
    setPageTheme: (t: ThemeKey | null) => void; // <-- NEW
};

const BirthdayCtx = createContext<Ctx | null>(null);

export function BirthdayProvider({ children }: { children: React.ReactNode }) {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [filter, setFilter] = useState<Category | "All">("All");
    const [query, setQuery] = useState("");
    const [globalTheme, setGlobalTheme] = useState<ThemeKey>(loadGlobalTheme());
    const [pageTheme, setPageTheme] = useState<ThemeKey | null>(null);

    // load/save profiles
    useEffect(() => {
        const saved = loadAll();
        if (saved.length === 0) {
            setProfiles([
                {
                    id: "1", name: "Sachin Kumar", dob: "1992-08-17", category: "Friends",
                    isPublic: false,
                    notes: []
                },
                {
                    id: "2", name: "Elon Musk", dob: "1971-06-28", category: "Friends",
                    isPublic: false,
                    notes: []
                },
                {
                    id: "3", name: "Steve Jobs", dob: "1955-02-24", category: "Legends",
                    isPublic: false,
                    notes: []
                },
            ]);
        } else {
            setProfiles(saved);
        }
    }, []);

    useEffect(() => saveAll(profiles), [profiles]);

    const updateGlobalTheme = (t: ThemeKey) => {
        setGlobalTheme(t);
        saveGlobalTheme(t);
    };

    const value = useMemo(() => ({
        profiles: [...profiles].sort((a, b) =>
            nextBirthdayDate(a.dob).getTime() - nextBirthdayDate(b.dob).getTime()
        ),
        setProfiles,
        filter,
        setFilter,
        query,
        setQuery,
        globalTheme,
        updateGlobalTheme,
        pageTheme,
        setPageTheme,
    }), [profiles, filter, query, globalTheme, pageTheme]);

    return <BirthdayCtx.Provider value={value}>{children}</BirthdayCtx.Provider>;
}

export function useBirthdays() {
    const ctx = useContext(BirthdayCtx);
    if (!ctx) throw new Error("useBirthdays must be used inside <BirthdayProvider>");
    return ctx;
}
