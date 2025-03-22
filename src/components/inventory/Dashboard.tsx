import StockSummary from "@/components/dashboard/StockSummary";
import RecentMovements from "@/components/dashboard/RecentMovements";
import LowStockAlerts from "@/components/dashboard/LowStockAlerts";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleString()}
          </span>
        </div>
      </div>

      <StockSummary />

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-4">
        <RecentMovements />
        <LowStockAlerts />
      </div>
    </div>
  );
}
