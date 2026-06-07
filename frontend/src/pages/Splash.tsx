import { useEffect, useState } from "react";

export default function Splash({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          onFinish();
          return 100;
        }
        return p + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-brand text-white">
      <h1 className="text-4xl font-bold mb-6 animate-bounce">Shigosag BMS</h1>
      <div className="w-64 h-4 bg-gray-200 rounded overflow-hidden">
        <div
          className="h-full bg-white transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="mt-4">{progress}% Loading...</p>
    </div>
  );
}