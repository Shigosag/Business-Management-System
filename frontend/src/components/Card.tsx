interface CardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  badge?: string;
}

export default function Card({ title, value, subtitle, badge }: CardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700/60 transition-all duration-200 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold tracking-wide uppercase text-gray-500 dark:text-gray-400">
          {title}
        </h3>
        {badge && (
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400">
            {badge}
          </span>
        )}
      </div>
      <div>
        <p className="text-3xl font-extrabold text-red-600 dark:text-red-500 tracking-tight">
          {value}
        </p>
        {subtitle && (
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 font-medium">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
