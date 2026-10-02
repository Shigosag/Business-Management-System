interface SidebarProps {
  currentPage: "dashboard" | "customers";
  onNavigate: (page: "dashboard" | "customers") => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({
  currentPage,
  onNavigate,
  isOpen,
  onClose,
}: SidebarProps) {
  const navItems: { id: "dashboard" | "customers"; label: string; icon: string }[] = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "customers", label: "Customers", icon: "👥" },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Slide-out navigation drawer */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-gray-950 text-white flex flex-col border-r border-gray-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center font-bold text-white shadow-md">
              B
            </div>
            <h1 className="text-lg font-bold tracking-tight text-white">Shigosag BMS</h1>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-white text-xl"
            aria-label="Close sidebar"
          >
            &times;
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  onClose();
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 ${
                  isActive
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                    : "text-gray-400 hover:text-white hover:bg-gray-900"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-900 text-xs text-gray-500 text-center">
          Powered by <span className="font-semibold text-gray-400">Shigosag</span>
        </div>
      </aside>
    </>
  );
}
