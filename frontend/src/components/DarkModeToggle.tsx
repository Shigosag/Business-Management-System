import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [dark, setDark] = useState<boolean>(() => {
    return (
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  useEffect(() => {
    const html = document.documentElement;
    if (dark) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      type="button"
      aria-label="Toggle Dark Mode"
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-semibold transition-colors duration-200 shadow-sm border border-gray-200 dark:border-gray-700"
    >
      {dark ? (
        <>
          <span className="text-yellow-400">☀️</span>
          <span className="hidden sm:inline">Light</span>
        </>
      ) : (
        <>
          <span className="text-gray-500">🌙</span>
          <span className="hidden sm:inline">Dark</span>
        </>
      )}
    </button>
  );
}
