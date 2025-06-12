"use client";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Sidebar from "./Sidebar";

const Header = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <header className="flex items-center justify-between p-4 shadow-md bg-white">
                <h1 className="text-xl font-bold">🎬 Movie Library</h1>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-4">
                    <Link href="/">Home</Link>
                    <Link href="/favorites">Favorites</Link>
                </nav>

                {/* Mobile Hamburger */}
                <button
                    className="md:hidden"
                    onClick={() => setSidebarOpen(true)}
                    aria-label="Open menu"
                >
                    <Menu size={28} />
                </button>
            </header>

            {/* Sidebar (Mobile Only) */}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </>
    );
};

export default Header;
