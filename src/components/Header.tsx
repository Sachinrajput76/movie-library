"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="bg-black text-white shadow-md">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold">
                    🎬 Movie Library
                </Link>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-white"
                >
                    ☰
                </button>
                <nav className={`md:flex gap-6 ${isOpen ? "block mt-4" : "hidden"} md:mt-0`}>
                    <Link href="/" className="hover:underline block">
                        Home
                    </Link>
                    <Link href="/favorites" className="hover:underline block">
                        Favorites
                    </Link>
                </nav>
            </div>
        </header>
    );
}
