interface CardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  badge?: string;
}

export default function Card({ title, value, subtitle, badge }: CardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-3.5 sm:p-5 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700/60 transition-all duration-200 flex flex-col justify-between">
      {/* Fixed-height header keeps all 4 cards aligned */}
      <div className="flex items-center justify-between min-h-[28px] gap-1 mb-2">
        <h3 className="text-xs sm:text-sm font-semibold tracking-wide uppercase text-gray-500 dark:text-gray-400 truncate">
          {title}
        </h3>
        {badge ? (
          <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 shrink-0">
            {badge}
          </span>
        ) : (
          <span className="invisible text-[10px] px-2 py-0.5">spacer</span>
        )}
      </div>

      {/* Metric Value */}
      <div>
        <p className="text-2xl sm:text-3xl font-extrabold text-red-600 dark:text-red-500 tracking-tight">
          {value}
        </p>
        {subtitle && (
          <p className="text-[11px] sm:text-xs text-gray-400 dark:text-gray-500 mt-1 font-medium truncate">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
