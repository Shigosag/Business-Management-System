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

    // DESTROY previous chart instance (VERY IMPORTANT)
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: title,
            data,
            borderColor: "#ef4444",
            backgroundColor: "rgba(239, 68, 68, 0.2)",
            fill: true,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
        },
      },
    });

    return () => {
      chartInstance.current?.destroy();
    };
  }, [data, labels, title]);

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <canvas ref={canvasRef} />
    </div>
  );
}