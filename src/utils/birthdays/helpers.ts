import { YearNote } from "./types";

export const fileToDataUrl = (file: File) =>
    new Promise<string>((res, rej) => {
        const r = new FileReader();
        r.onload = () => res(String(r.result));
        r.onerror = rej;
        r.readAsDataURL(file);
    });

export function ageOnDate(dobISO: string, on: Date) {
    const dob = new Date(dobISO);
    let age = on.getFullYear() - dob.getFullYear();
    const m = on.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && on.getDate() < dob.getDate())) age--;
    return age;
}
export function nextBirthdayDate(dobISO: string) {
    const dob = new Date(dobISO);
    const now = new Date();
    const y = now.getFullYear();
    const nb = new Date(y, dob.getMonth(), dob.getDate());
    if (nb < new Date(now.getFullYear(), now.getMonth(), now.getDate())) nb.setFullYear(y + 1);
    return nb;
}
export const formatDate = (d: Date) =>
    d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });

export const mailtoLink = (to: string | undefined, subject: string, body: string) =>
    `mailto:${to || ""}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export const whatsappShareLink = (text: string, phone?: string) => {
    const t = encodeURIComponent(text);
    return phone ? `https://wa.me/${encodeURIComponent(phone)}?text=${t}` : `https://wa.me/?text=${t}`;
};

export function groupNotesByYear(notes: YearNote[]): [number, YearNote[]][] {
    const map = new Map<number, YearNote[]>();
    for (const n of notes) {
        if (!map.has(n.year)) map.set(n.year, []);
        map.get(n.year)!.push(n);
    }
    for (const arr of map.values()) arr.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return Array.from(map.entries()).sort((a, b) => b[0] - a[0]);
}
