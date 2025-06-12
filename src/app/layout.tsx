import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";
import RehydrateFavorites from "@/components/RehydrateFavorites";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

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
          <Header />
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 p-4">{children}</main>
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
