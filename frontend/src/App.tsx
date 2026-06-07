import { useState } from "react";
import Splash from "./pages/Splash";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Sidebar from "./components/Sidebar";
import DarkModeToggle from "./components/DarkModeToggle";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [page, setPage] = useState<"dashboard" | "customers">("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false); // collapsed by default

  if (!loaded) return <Splash onFinish={() => setLoaded(true)} />;

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      {/* SIDEBAR */}
      <div
        className={`bg-black text-white transition-all duration-300 overflow-hidden ${
          sidebarOpen ? "w-64" : "w-0"
        }`}
      >
        <Sidebar onNavigate={(p: "dashboard" | "customers") => setPage(p)} />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6">
        <div className="flex justify-between mb-4">
          <button
            className="px-3 py-1 bg-red-500 text-white rounded"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰ Menu
          </button>

          <DarkModeToggle />
        </div>

        {page === "dashboard" && <Dashboard />}
        {page === "customers" && <Customers />}
      </div>
    </div>
  );
}