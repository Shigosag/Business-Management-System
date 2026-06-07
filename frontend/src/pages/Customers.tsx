import { useEffect, useState } from "react";
import { api } from "../api/client";

export default function Customers() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    api.get("/customers").then((res) => setData(res.data));
  }, []);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4 text-brand">Customers</h2>
      <div className="grid gap-3">
        {data.map((c) => (
          <div key={c.id} className="bg-white dark:bg-gray-800 p-4 rounded shadow hover:shadow-lg transition">
            <p className="font-bold">{c.name}</p>
            <p className="text-gray-500 dark:text-gray-300">{c.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}