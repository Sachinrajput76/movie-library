"use client";
import { BirthdayProvider } from "@/components/birthdays/context";
import BirthdayForm from "@/components/birthdays/BirthdayForm";
import { Suspense } from "react";

export default function AddBirthdayPage() {
    return (
        <main className="max-w-2xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Add a Birthday</h1>
            <BirthdayProvider>
                <Suspense fallback={<p>Loading form...</p>}>
                    <BirthdayForm />
                </Suspense>
            </BirthdayProvider>
        </main>
    );
}
