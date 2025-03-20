import React from "react";
import { Package, ShoppingCart, AlertCircle, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your inventory management system
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard 
          title="Total Products" 
          value="1,284" 
          description="+12.3% from last month" 
          icon={<Package className="h-5 w-5" />} 
        />
        <DashboardCard 
          title="Low Stock" 
          value="24" 
          description="Items below reorder point" 
          icon={<AlertCircle className="h-5 w-5" />} 
          variant="warning"
        />
        <DashboardCard 
          title="Sales" 
          value="$12,843" 
          description="+8.2% from last month" 
          icon={<ShoppingCart className="h-5 w-5" />} 
          variant="success"
        />
        <DashboardCard 
          title="Growth" 
          value="24.5%" 
          description="Year over year growth" 
          icon={<TrendingUp className="h-5 w-5" />} 
          variant="success"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-card text-card-foreground shadow">
          <div className="p-6">
            <h3 className="font-semibold leading-none tracking-tight">Recent Activity</h3>
            <p className="text-sm text-muted-foreground">Recent inventory movements</p>
          </div>
          <div className="p-6 pt-0">
            {/* Activity list would go here */}
            <ul className="space-y-4">
              <li className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium">Product SKU-1234 received</p>
                  <p className="text-xs text-muted-foreground">Warehouse A</p>
                </div>
                <span className="text-xs text-muted-foreground">2 hours ago</span>
              </li>
              <li className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium">20 units of SKU-5678 shipped</p>
                  <p className="text-xs text-muted-foreground">Order #45678</p>
                </div>
                <span className="text-xs text-muted-foreground">5 hours ago</span>
              </li>
              <li className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium">Inventory adjusted for SKU-9012</p>
                  <p className="text-xs text-muted-foreground">-5 units (damaged)</p>
                </div>
                <span className="text-xs text-muted-foreground">Yesterday</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow">
          <div className="p-6">
            <h3 className="font-semibold leading-none tracking-tight">Popular Products</h3>
            <p className="text-sm text-muted-foreground">Top selling items this month</p>
          </div>
          <div className="p-6 pt-0">
            {/* Products list would go here */}
            <ul className="space-y-4">
              <li className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium">Product A</p>
                  <p className="text-xs text-muted-foreground">SKU-1001</p>
                </div>
                <span className="text-sm font-medium">245 units</span>
              </li>
              <li className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium">Product B</p>
                  <p className="text-xs text-muted-foreground">SKU-1002</p>
                </div>
                <span className="text-sm font-medium">189 units</span>
              </li>
              <li className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium">Product C</p>
                  <p className="text-xs text-muted-foreground">SKU-1003</p>
                </div>
                <span className="text-sm font-medium">145 units</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow lg:col-span-1">
          <div className="p-6">
            <h3 className="font-semibold leading-none tracking-tight">Pending Orders</h3>
            <p className="text-sm text-muted-foreground">Orders awaiting fulfillment</p>
          </div>
          <div className="p-6 pt-0">
            {/* Orders list would go here */}
            <ul className="space-y-4">
              <li className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium">Order #12345</p>
                  <p className="text-xs text-muted-foreground">12 items • High priority</p>
                </div>
                <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-medium text-orange-800">Pending</span>
              </li>
              <li className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium">Order #12346</p>
                  <p className="text-xs text-muted-foreground">5 items • Normal priority</p>
                </div>
                <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">Processing</span>
              </li>
              <li className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium">Order #12347</p>
                  <p className="text-xs text-muted-foreground">8 items • Low priority</p>
                </div>
                <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-medium text-orange-800">Pending</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

interface DashboardCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger";
}

function DashboardCard({ title, value, description, icon, variant = "default" }: DashboardCardProps) {
  const variantClasses = {
    default: "bg-card",
    success: "bg-card",
    warning: "bg-card",
    danger: "bg-card"
  };

  const iconClasses = {
    default: "text-primary",
    success: "text-green-500",
    warning: "text-orange-500", 
    danger: "text-red-500"
  };

  return (
    <div className={`rounded-lg border ${variantClasses[variant]} p-6 text-card-foreground shadow`}>
      <div className="flex items-center justify-between space-x-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>
        <div className={`p-2 rounded-full ${iconClasses[variant]}`}>{icon}</div>
      </div>
    </div>
  );
} 