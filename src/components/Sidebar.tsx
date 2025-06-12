"use client";

import Link from "next/link";

export default function Sidebar() {
    return (
        <aside className="hidden md:block w-60 bg-gray-100 p-4 h-full border-r">
            <h2 className="text-lg font-bold mb-4">Menu</h2>
            <ul className="space-y-2">
                <li>
                    <Link href="/" className="hover:text-blue-600">
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/favorites" className="hover:text-blue-600">
                        Favorites
                    </Link>
                </li>
            </ul>
        </aside>
    );
}
