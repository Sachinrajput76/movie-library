// src/app/birthdays/page.tsx
import BirthdaysPageClient from "./BirthdaysPageClient";
import { BirthdayProvider } from "@/components/birthdays/context";

export default function BirthdaysPage() {
    return (
        <BirthdayProvider>
            <BirthdaysPageClient />
        </BirthdayProvider>
    );
}
