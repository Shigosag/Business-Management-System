import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface ChartCardProps {
  title: string;
  data: number[];
  labels: string[];
}

export default function ChartCard({ title, data, labels }: ChartCardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const isDarkMode = document.documentElement.classList.contains("dark");
    const gridColor = isDarkMode ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.05)";
    const textColor = isDarkMode ? "#9ca3af" : "#6b7280";

    chartInstance.current = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: title,
            data,
            borderColor: "#ef4444",
            backgroundColor: "rgba(239, 68, 68, 0.12)",
            borderWidth: 2.5,
            fill: true,
            tension: 0.35,
            pointBackgroundColor: "#ef4444",
            pointRadius: 4,
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#1f2937",
            padding: 10,
            titleFont: { size: 13, weight: "bold" },
            bodyFont: { size: 12 },
          },
        },
        scales: {
          x: {
            grid: { color: gridColor },
            ticks: { color: textColor },
          },
          y: {
            grid: { color: gridColor },
            ticks: { color: textColor },
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      chartInstance.current?.destroy();
    };
  }, [data, labels, title]);

  return (
    <div className="p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/60 transition-all flex flex-col h-[320px]">
      <h2 className="text-base font-bold text-gray-800 dark:text-gray-100 mb-3">{title}</h2>
      <div className="relative flex-1 w-full">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
