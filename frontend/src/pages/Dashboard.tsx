import Card from "../components/Card";
import ChartCard from "../components/ChartCard";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-brand">
        Business Dashboard
      </h1>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Customers" value="120" />
        <Card title="Revenue" value="$45,000" />
        <Card title="Orders" value="320" />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChartCard
          title="Revenue Trend"
          data={[4000, 4500, 5000, 4700]}
          labels={["Jan", "Feb", "Mar", "Apr"]}
        />

        <ChartCard
          title="New Customers"
          data={[10, 25, 30, 20]}
          labels={["Jan", "Feb", "Mar", "Apr"]}
        />
      </div>
    </div>
  );
}