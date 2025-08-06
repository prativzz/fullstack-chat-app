import { useTheme } from "../ThemeContext";
import { Moon, Sun } from "lucide-react";

const SettingsPage = () => {
  const { isDarkMode, setIsDarkMode } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 px-6 pt-24 pb-12 transition-colors duration-300">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>

        {/* Theme toggle */}
        <div className="flex items-center justify-between p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white/70 dark:bg-zinc-800 backdrop-blur-md shadow-sm transition">
          <div className="flex items-center gap-3">
            {isDarkMode ? (
              <Moon className="text-zinc-600 dark:text-zinc-200" />
            ) : (
              <Sun className="text-zinc-600 dark:text-zinc-200" />
            )}
            <div>
              <p className="font-medium">Dark Mode</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Switch between light and dark themes
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`relative inline-flex items-center h-6 w-11 rounded-full transition ${
              isDarkMode ? "bg-zinc-600" : "bg-zinc-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform bg-white rounded-full transition ${
                isDarkMode ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
