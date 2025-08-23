import { ThemeKey } from "./themes";

export type YearNote = {
    year: number;
    text: string;
    createdAt: string; // ISO
};
export type Category = "Family" | "Relatives" | "Friends" | "Important" | "Legends" | "Others";

export type Profile = {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    dob: string;            // yyyy-mm-dd
    category: Category;
    isPublic: boolean;
    photoDataUrl?: string;  // base64
    audioDataUrl?: string;  // base64 or remote
    theme?: ThemeKey;
    notes: YearNote[];
};
