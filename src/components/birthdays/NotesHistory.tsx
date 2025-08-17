import { YearNote } from "@/utils/birthdays/types";

export default function NotesHistory({
    groups,
}: {
    groups: [number, YearNote[]][];
}) {
    if (!groups.length)
        return (
            <p className="text-gray-500 italic text-sm mt-2">No notes yet.</p>
        );

    return (
        <div className="space-y-6 mt-4">
            {groups.map(([year, notes]) => (
                <div key={year} className="border-b border-gray-200 pb-4">
                    <h3 className="text-lg font-semibold mb-2">{year}</h3>
                    <ul className="space-y-2">
                        {notes.map((n) => (
                            <li
                                key={n.createdAt}
                                className="flex items-start space-x-3 text-sm"
                            >
                                <span className="text-gray-400 min-w-[100px]">
                                    {new Date(n.createdAt).toLocaleDateString()}
                                </span>
                                <span className="text-gray-800">{n.text}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
