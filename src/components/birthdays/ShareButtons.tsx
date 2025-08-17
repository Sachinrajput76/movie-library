"use client";
import { mailtoLink, whatsappShareLink } from "@/utils/birthdays/helpers";
import { Profile } from "@/utils/birthdays/types";

export default function ShareButtons({ profile, compact = false }: { profile: Profile; compact?: boolean }) {
    const text = `🎉 Happy Birthday ${profile.name}!`;
    const email = mailtoLink(profile.email, `Happy Birthday ${profile.name}!`, text);
    const wa = whatsappShareLink(text, profile.phone);

    const share = async () => {
        if (navigator.share) {
            try {
                await navigator.share({ title: text, text, url: location.href });
            } catch {
                // user canceled or error
            }
        } else {
            alert("Web Share API not available.");
        }
    };

    if (!profile.isPublic) return null;

    return (
        <div className={`flex ${compact ? "space-x-2" : "space-x-4 mt-3"}`}>
            <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-sm rounded-md transition"
            >
                WhatsApp
            </a>
            <a
                href={email}
                className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-md transition"
            >
                Email
            </a>
            <button
                onClick={share}
                className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white text-sm rounded-md transition"
            >
                Share
            </button>
        </div>
    );
}
