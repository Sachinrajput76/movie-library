"use client";
import { Clapperboard, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Sidebar from "./Sidebar";

const Header = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <header className="flex items-center justify-between p-4 shadow-md bg-white">
                {/* Logo section */}
                <Link
                    href="/"
                    className="flex items-center gap-2 text-xl font-bold cursor-pointer"
                >
                    <Clapperboard className="w-6 h-6 text-blue-600" />
                    <span>Movie Library</span>
                </Link>

                {/* Nav bar section - Desktop */}
                <nav className="hidden md:flex gap-4">
                    <Link href="/">Home</Link>
                    <Link href="/favorites">Favorites</Link>
                </nav>

                {/* Hamburger icon - Mobile */}
                <button
                    className="md:hidden"
                    onClick={() => setSidebarOpen(true)}
                    aria-label="Open menu"
                >
                    <Menu size={28} />
                </button>
            </header>

            {/* Sidebar - For Mobile Only */}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </>
    );
};

export default Header;
