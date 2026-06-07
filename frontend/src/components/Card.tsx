export default function Card({
  title,
  value
}: { title: string; value: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition-all">
      <h3 className="text-gray-500 dark:text-gray-300">{title}</h3>
      <p className="text-2xl font-bold text-brand">{value}</p>
    </div>
  );
}