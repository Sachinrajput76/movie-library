import { themeVars } from "@/utils/birthdays/themes";
import { useBirthdays } from "./context";

export default function ThemeSelector() {
    const { selectedTheme } = useBirthdays();
    const activeTheme = themeVars[selectedTheme] ?? themeVars["Confetti"];

    return (
        <div className={`${activeTheme.bg} ${activeTheme.text} p-4`}>
            🎉 Theme applied: {selectedTheme || "Confetti"}
        </div>
    );

}
