import { Profile } from "./types";

const STORAGE_KEY = "birthday_profiles_v1";

export function loadAll(): Profile[] {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
    catch { return []; }
}
export function saveAll(profiles: Profile[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
}
export function getById(id: string): Profile | undefined {
    return loadAll().find(p => p.id === id);
}
