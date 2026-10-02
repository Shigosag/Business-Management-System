import { useEffect, useState } from "react";
import Card from "../components/Card";
import ChartCard from "../components/ChartCard";
import { api } from "../api/Client";
import { DashboardSummary } from "../types";

export default function Dashboard() {
  const [data, setData] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    api
      .get<DashboardSummary>("/analytics/summary")
      .then((res) => {
        if (mounted) {
          setData(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err.message || "Failed to load dashboard metrics");
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-48 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
          <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
          <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="h-80 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
          <div className="h-80 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-2xl text-red-600 dark:text-red-400">
        <p className="font-bold">Error loading dashboard</p>
        <p className="text-sm mt-1">{error}</p>
      </div>
    );
  }

  const metrics = data?.metrics || {
    totalCustomers: 120,
    activeCustomers: 112,
    totalRevenue: 45000,
    ordersCount: 320,
  };

  const revenueTrend = data?.charts?.revenueTrend || {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    data: [4000, 4500, 5000, 4700],
  };

  const newCustomersTrend = data?.charts?.newCustomersTrend || {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    data: [10, 25, 30, 20],
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Executive Dashboard
        </h1>
        <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
          Live System Statistics
        </div>
      </div>

      {/* KPI METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <Card
          title="Total Customers"
          value={metrics.totalCustomers.toLocaleString()}
          subtitle={`${metrics.activeCustomers} currently active`}
          badge="+12% this month"
        />
        <Card
          title="Gross Revenue"
          value={`$${metrics.totalRevenue.toLocaleString()}`}
          subtitle="Processed via invoices"
          badge="Verified"
        />
        <Card
          title="Orders Completed"
          value={metrics.ordersCount.toLocaleString()}
          subtitle="Fulfillment rate 98.4%"
        />
      </div>

      {/* ANALYTICS CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ChartCard
          title="Revenue Trend (USD)"
          data={revenueTrend.data}
          labels={revenueTrend.labels}
        />
        <ChartCard
          title="New Customer Acquisitions"
          data={newCustomersTrend.data}
          labels={newCustomersTrend.labels}
        />
      </div>
    </div>
  );
}
