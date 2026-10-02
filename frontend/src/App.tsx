import { useState } from "react";
import Splash from "./pages/Splash";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { ToastProvider } from "./components/Toast";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [page, setPage] = useState<"dashboard" | "customers">("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!loaded) return <Splash onFinish={() => setLoaded(true)} />;

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col font-sans transition-colors duration-200">
        {/* SIDEBAR NAVIGATION DRAWER */}
        <Sidebar
          currentPage={page}
          onNavigate={(p) => setPage(p)}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* MAIN APPLICATION CONTAINER */}
        <div className="flex-1 flex flex-col lg:pl-64 transition-all duration-300">
          <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {page === "dashboard" && <Dashboard />}
            {page === "customers" && <Customers />}
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
