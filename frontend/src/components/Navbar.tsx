export default function Navbar({
  onToggleSidebar,
}: {
  onToggleSidebar: () => void;
}) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 shadow">
      <h1 className="font-bold text-xl text-red-500">
        Shigosag BMS
      </h1>

      <button
        onClick={onToggleSidebar}
        className="px-3 py-1 bg-red-500 text-white rounded"
      >
        ☰ Menu
      </button>
    </div>
  );
}