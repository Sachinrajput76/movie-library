"use client";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Category, Profile } from "@/utils/birthdays/types";
import { loadAll, saveAll } from "@/utils/birthdays/storage";
import { fileToDataUrl } from "@/utils/birthdays/helpers";
import { themeKeys } from "@/utils/birthdays/themes";

const categories: Category[] = ["Family", "Relatives", "Friends", "Important", "Others"];

export default function BirthdayForm() {
    const params = useSearchParams();
    const router = useRouter();
    const editId = params.get("edit");
    const all = useMemo(() => loadAll(), []);
    const editing = all.find(p => p.id === editId);

    const [form, setForm] = useState<Profile>(() => editing ?? ({
        id: crypto.randomUUID(),
        name: "",
        dob: new Date().toISOString().slice(0, 10),
        category: "Friends",
        isPublic: true,
        notes: [],
    }));

    useEffect(() => { if (editing) setForm(editing); }, [editId]);

    function set<K extends keyof Profile>(k: K, v: Profile[K]) {
        setForm(prev => ({ ...prev, [k]: v }));
    }

    async function onPhoto(e: React.ChangeEvent<HTMLInputElement>) {
        const f = e.target.files?.[0]; if (!f) return;
        set("photoDataUrl", await fileToDataUrl(f));
    }
    async function onAudio(e: React.ChangeEvent<HTMLInputElement>) {
        const f = e.target.files?.[0]; if (!f) return;
        set("audioDataUrl", await fileToDataUrl(f));
    }

    function submit(e: React.FormEvent) {
        e.preventDefault();
        if (!form.name.trim()) { alert("Name is required"); return; }
        const others = all.filter(p => p.id !== form.id);
        saveAll([...others, form]);
        router.push("/birthdays");
    }

    return (
        <form
            onSubmit={submit}
            className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-6"
        >
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex flex-col text-sm font-medium">
                    Full Name*
                    <input
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        required
                        className="mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
                    />
                </label>
                <label className="flex flex-col text-sm font-medium">
                    Date of Birth*
                    <input
                        type="date"
                        value={form.dob}
                        onChange={(e) => set("dob", e.target.value)}
                        required
                        className="mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
                    />
                </label>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex flex-col text-sm font-medium">
                    Category
                    <select
                        value={form.category}
                        onChange={(e) => set("category", e.target.value as Category)}
                        className="mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
                    >
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </label>

                <label className="flex flex-col text-sm font-medium">
                    Theme (profile)
                    <select
                        value={form.theme || ""}
                        onChange={(e) => set("theme", e.target.value as any)}
                        className="mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
                    >
                        <option value="">Use Global Theme</option>
                        {themeKeys.map(k => <option key={k} value={k}>{k}</option>)}
                    </select>
                </label>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex flex-col text-sm font-medium">
                    Email (reminders)
                    <input
                        type="email"
                        value={form.email || ""}
                        onChange={(e) => set("email", e.target.value)}
                        className="mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
                    />
                </label>
                <label className="flex flex-col text-sm font-medium">
                    Phone (WhatsApp, +cc…)
                    <input
                        placeholder="+91xxxxxxxxxx"
                        value={form.phone || ""}
                        onChange={(e) => set("phone", e.target.value)}
                        className="mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
                    />
                </label>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex flex-col text-sm font-medium">
                    Photo
                    <input
                        type="file"
                        accept="image/*"
                        onChange={onPhoto}
                        className="mt-1"
                    />
                </label>
                <label className="flex flex-col text-sm font-medium">
                    Birthday Audio (auto-play)
                    <input
                        type="file"
                        accept="audio/*"
                        onChange={onAudio}
                        className="mt-1"
                    />
                </label>
            </div>

            {/* Public checkbox */}
            <label className="flex items-center space-x-2 cursor-pointer">
                <input
                    type="checkbox"
                    checked={form.isPublic}
                    onChange={(e) => set("isPublic", e.target.checked)}
                    className="h-4 w-4 text-blue-600"
                />
                <span className="text-sm">Public profile (shareable)</span>
            </label>

            {/* Actions */}
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Save
                </button>
            </div>
        </form>
    );
}
