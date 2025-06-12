"use client";
import { X } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLElement).id === "sidebar-backdrop") {
            onClose();
        }
    };

    return (
        <div
            id="sidebar-backdrop"
            onClick={handleBackdropClick}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xm md:hidden"
        >
            <div
                className={clsx(
                    "bg-white w-64 h-full p-4 shadow-lg transition-transform transform duration-300",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Menu</h2>
                    <button onClick={onClose} aria-label="Close menu">
                        <X size={24} />
                    </button>
                </div>
                <nav className="flex flex-col gap-4">
                    <Link href="/" onClick={onClose}>Home</Link>
                    <Link href="/favorites" onClick={onClose}>Favorites</Link>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
