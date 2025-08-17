"use client";
import { RefObject, useEffect, useState } from "react";

export default function AudioPlayer({
    src,
    audioRef,
}: {
    src?: string;
    audioRef: RefObject<HTMLAudioElement>;
}) {
    const [muted, setMuted] = useState(true);

    useEffect(() => {
        const el = audioRef.current;
        if (!el || !src) return;
        el.muted = true; // start muted to satisfy autoplay policies
        el.play().catch(() => {
            /* ignored */
        });
    }, [audioRef, src]);

    if (!src)
        return (
            <p className="text-gray-500 italic text-sm mt-2">
                No birthday audio uploaded.
            </p>
        );

    return (
        <div className="flex items-center space-x-3 mt-2">
            <audio
                ref={audioRef}
                src={src}
                controls
                playsInline
                autoPlay
                muted={muted}
                className="w-full max-w-md"
            />
            {muted && (
                <button
                    onClick={() => {
                        setMuted(false);
                        setTimeout(() => audioRef.current?.play().catch(() => { }), 0);
                    }}
                    className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                    🔊 Unmute
                </button>
            )}
        </div>
    );
}
