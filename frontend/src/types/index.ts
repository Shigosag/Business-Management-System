export interface Customer {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt?: string;
}

export interface DashboardMetrics {
  totalCustomers: number;
  activeCustomers: number;
  totalRevenue: number;
  ordersCount: number;
}

export interface ChartDataset {
  labels: string[];
  data: number[];
}

export interface DashboardSummary {
  metrics: DashboardMetrics;
  charts: {
    revenueTrend: ChartDataset;
    newCustomersTrend: ChartDataset;
  };
}

export type ToastType = "success" | "error" | "info";

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
}
