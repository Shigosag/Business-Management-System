import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (dark) html.classList.add("dark");
    else html.classList.remove("dark");
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="bg-brand text-white px-4 py-2 rounded shadow hover:bg-red-600 transition"
    >
      {dark ? "Light Mode" : "Dark Mode"}
    </button>
  );
}