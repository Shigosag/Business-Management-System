export default function Sidebar() {
  return (
    <div className="w-64 bg-black text-white p-5 flex flex-col transition-colors duration-300">
      <h1 className="text-xl font-bold text-brand">Shigosag BMS</h1>
      <ul className="mt-6 space-y-3">
        <li className="hover:text-brand cursor-pointer">Dashboard</li>
        <li className="hover:text-brand cursor-pointer">Customers</li>
      </ul>
    </div>
  );
}