// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";
import RehydrateFavorites from "@/components/RehydrateFavorites";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movie Library",
  description: "Browse and favorite your movies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <RehydrateFavorites />
          {children}
        </Providers>
      </body>
    </html>
  );
}
