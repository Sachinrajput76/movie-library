// src/utils/birthdays/themes.ts

export type ThemeKey = "Confetti" | "Minimal" | "Dark";

export const themeKeys: ThemeKey[] = ["Confetti", "Minimal", "Dark"];

export const themeVars: Record<ThemeKey, { bg: string; text: string }> = {
    Confetti: { bg: "bg-gradient-to-r from-pink-300 to-yellow-200", text: "text-black" },
    Minimal: { bg: "bg-gray-100", text: "text-gray-800" },
    Dark: { bg: "bg-gray-900", text: "text-white" },
};

const THEME_KEY = "birthday_global_theme_v1";

export const loadGlobalTheme = (): ThemeKey => {
    if (typeof window === "undefined") return "Confetti";
    return (localStorage.getItem(THEME_KEY) as ThemeKey) || "Confetti";
};

export const saveGlobalTheme = (t: ThemeKey) => {
    if (typeof window !== "undefined") {
        localStorage.setItem(THEME_KEY, t);
    }
};

export const themeStyle = (k?: ThemeKey) => {
    switch (k) {
        case "Minimal":
            return { backgroundColor: "#f5f5f5", color: "#333" };
        case "Dark":
            return { backgroundColor: "#1a1a1a", color: "#eee" };
        case "Confetti":
        default:
            return { background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)" };
    }
};
