"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowDownIcon, 
  ArrowUpIcon, 
  BarChart3Icon, 
  ClipboardListIcon, 
  PackageIcon, 
  PieChartIcon, 
  TrendingUpIcon,
  UsersIcon 
} from "lucide-react";

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("last30");
  
  // Normally you would fetch this data from an API
  const inventorySummary = {
    totalItems: 1248,
    lowStock: 22,
    outOfStock: 5,
    recentlyAdded: 36,
    totalValue: 157892.50,
    change: 12.5
  };
  
  const productsSummary = {
    total: 85,
    categories: 12,
    topSelling: "Laptop",
    lowStockPercentage: 8,
    change: 5.2
  };
  
  const customersSummary = {
    total: 320,
    active: 275,
    newThisMonth: 14,
    retention: 92,
    change: 3.7
  };
  
  const transactionsSummary = {
    total: 542,
    thisMonth: 48,
    value: 87650.25,
    pending: 3,
    change: -2.1
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Reports</h2>
          <p className="text-muted-foreground">
            Analyze your inventory and business data
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="dateRange" className="sr-only">Date Range</Label>
          <select
            id="dateRange"
            className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="last7">Last 7 Days</option>
            <option value="last30">Last 30 Days</option>
            <option value="thisMonth">This Month</option>
            <option value="lastMonth">Last Month</option>
            <option value="thisYear">This Year</option>
          </select>
          <Button variant="outline">Export</Button>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
            <PackageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${inventorySummary.totalValue.toLocaleString()}</div>
            <div className="flex items-center pt-1 text-xs text-muted-foreground">
              {inventorySummary.change > 0 ? (
                <ArrowUpIcon className="mr-1 h-3 w-3 text-emerald-500" />
              ) : (
                <ArrowDownIcon className="mr-1 h-3 w-3 text-red-500" />
              )}
              <span className={inventorySummary.change > 0 ? "text-emerald-500" : "text-red-500"}>
                {Math.abs(inventorySummary.change)}%
              </span>
              <span className="ml-1">from last period</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <ClipboardListIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productsSummary.total}</div>
            <div className="flex items-center pt-1 text-xs text-muted-foreground">
              {productsSummary.change > 0 ? (
                <ArrowUpIcon className="mr-1 h-3 w-3 text-emerald-500" />
              ) : (
                <ArrowDownIcon className="mr-1 h-3 w-3 text-red-500" />
              )}
              <span className={productsSummary.change > 0 ? "text-emerald-500" : "text-red-500"}>
                {Math.abs(productsSummary.change)}%
              </span>
              <span className="ml-1">from last period</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customersSummary.total}</div>
            <div className="flex items-center pt-1 text-xs text-muted-foreground">
              {customersSummary.change > 0 ? (
                <ArrowUpIcon className="mr-1 h-3 w-3 text-emerald-500" />
              ) : (
                <ArrowDownIcon className="mr-1 h-3 w-3 text-red-500" />
              )}
              <span className={customersSummary.change > 0 ? "text-emerald-500" : "text-red-500"}>
                {Math.abs(customersSummary.change)}%
              </span>
              <span className="ml-1">from last period</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{transactionsSummary.thisMonth}</div>
            <div className="flex items-center pt-1 text-xs text-muted-foreground">
              {transactionsSummary.change > 0 ? (
                <ArrowUpIcon className="mr-1 h-3 w-3 text-emerald-500" />
              ) : (
                <ArrowDownIcon className="mr-1 h-3 w-3 text-red-500" />
              )}
              <span className={transactionsSummary.change > 0 ? "text-emerald-500" : "text-red-500"}>
                {Math.abs(transactionsSummary.change)}%
              </span>
              <span className="ml-1">from last period</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Report Tabs */}
      <Tabs defaultValue="inventory" className="mt-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>
        
        {/* Inventory Tab */}
        <TabsContent value="inventory" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Inventory Status</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-muted-foreground">Total Items</p>
                    <p className="text-2xl font-bold">{inventorySummary.totalItems}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Low Stock Items</p>
                    <p className="text-2xl font-bold">{inventorySummary.lowStock}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Out of Stock</p>
                    <p className="text-2xl font-bold">{inventorySummary.outOfStock}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Recently Added</p>
                    <p className="text-2xl font-bold">{inventorySummary.recentlyAdded}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Inventory by Location</CardTitle>
              </CardHeader>
              <CardContent className="h-[240px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <PieChartIcon className="mx-auto h-12 w-12 mb-2" />
                  <p>Chart would appear here in a real implementation</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Low Stock Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors data-[state=selected]:bg-muted">
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Product</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Location</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Current Qty</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Min. Required</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-3 align-middle font-medium">Wireless Mouse</td>
                        <td className="p-3 align-middle">Main Warehouse</td>
                        <td className="p-3 align-middle">5</td>
                        <td className="p-3 align-middle">15</td>
                        <td className="p-3 align-middle">
                          <span className="text-amber-600 bg-amber-50 px-2 py-1 rounded-md text-xs font-medium">Low Stock</span>
                        </td>
                      </tr>
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-3 align-middle font-medium">Laptop</td>
                        <td className="p-3 align-middle">East Coast Warehouse</td>
                        <td className="p-3 align-middle">2</td>
                        <td className="p-3 align-middle">10</td>
                        <td className="p-3 align-middle">
                          <span className="text-amber-600 bg-amber-50 px-2 py-1 rounded-md text-xs font-medium">Low Stock</span>
                        </td>
                      </tr>
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-3 align-middle font-medium">T-Shirt (XL)</td>
                        <td className="p-3 align-middle">West Coast Warehouse</td>
                        <td className="p-3 align-middle">0</td>
                        <td className="p-3 align-middle">20</td>
                        <td className="p-3 align-middle">
                          <span className="text-red-600 bg-red-50 px-2 py-1 rounded-md text-xs font-medium">Out of Stock</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Products Tab */}
        <TabsContent value="products" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Product Categories</CardTitle>
              </CardHeader>
              <CardContent className="h-[240px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <PieChartIcon className="mx-auto h-12 w-12 mb-2" />
                  <p>Chart would appear here in a real implementation</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Selling Products</CardTitle>
              </CardHeader>
              <CardContent className="h-[240px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <BarChart3Icon className="mx-auto h-12 w-12 mb-2" />
                  <p>Chart would appear here in a real implementation</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Product Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors data-[state=selected]:bg-muted">
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Product</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Category</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Sales</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Revenue</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Growth</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-3 align-middle font-medium">Laptop</td>
                        <td className="p-3 align-middle">Electronics</td>
                        <td className="p-3 align-middle">42</td>
                        <td className="p-3 align-middle">$52,500</td>
                        <td className="p-3 align-middle text-emerald-600">+12.5%</td>
                      </tr>
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-3 align-middle font-medium">Wireless Mouse</td>
                        <td className="p-3 align-middle">Electronics</td>
                        <td className="p-3 align-middle">89</td>
                        <td className="p-3 align-middle">$3,115</td>
                        <td className="p-3 align-middle text-emerald-600">+8.2%</td>
                      </tr>
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-3 align-middle font-medium">T-Shirt</td>
                        <td className="p-3 align-middle">Apparel</td>
                        <td className="p-3 align-middle">125</td>
                        <td className="p-3 align-middle">$3,750</td>
                        <td className="p-3 align-middle text-red-600">-3.1%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Sales Tab */}
        <TabsContent value="sales" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
              </CardHeader>
              <CardContent className="h-[240px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <BarChart3Icon className="mx-auto h-12 w-12 mb-2" />
                  <p>Chart would appear here in a real implementation</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${transactionsSummary.value.toLocaleString()}</div>
                <div className="flex items-center pt-1 text-xs text-muted-foreground">
                  {transactionsSummary.change > 0 ? (
                    <ArrowUpIcon className="mr-1 h-3 w-3 text-emerald-500" />
                  ) : (
                    <ArrowDownIcon className="mr-1 h-3 w-3 text-red-500" />
                  )}
                  <span className={transactionsSummary.change > 0 ? "text-emerald-500" : "text-red-500"}>
                    {Math.abs(transactionsSummary.change)}%
                  </span>
                  <span className="ml-1">from last period</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{transactionsSummary.total}</div>
                <div className="text-xs text-muted-foreground pt-1">
                  <span>{transactionsSummary.thisMonth} this month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Avg. Transaction Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${(transactionsSummary.value / transactionsSummary.total).toFixed(2)}
                </div>
                <div className="text-xs text-muted-foreground pt-1">
                  <span>Per transaction</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors data-[state=selected]:bg-muted">
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Transaction ID</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Customer</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Amount</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-3 align-middle font-medium">TRX-2023-001</td>
                        <td className="p-3 align-middle">John Smith</td>
                        <td className="p-3 align-middle">Jun 12, 2023</td>
                        <td className="p-3 align-middle">$1,250.00</td>
                        <td className="p-3 align-middle">
                          <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md text-xs font-medium">Completed</span>
                        </td>
                      </tr>
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-3 align-middle font-medium">TRX-2023-002</td>
                        <td className="p-3 align-middle">Emma Johnson</td>
                        <td className="p-3 align-middle">Jun 10, 2023</td>
                        <td className="p-3 align-middle">$899.99</td>
                        <td className="p-3 align-middle">
                          <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md text-xs font-medium">Completed</span>
                        </td>
                      </tr>
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-3 align-middle font-medium">TRX-2023-003</td>
                        <td className="p-3 align-middle">Michael Brown</td>
                        <td className="p-3 align-middle">Jun 8, 2023</td>
                        <td className="p-3 align-middle">$475.25</td>
                        <td className="p-3 align-middle">
                          <span className="text-amber-600 bg-amber-50 px-2 py-1 rounded-md text-xs font-medium">Pending</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Customers Tab */}
        <TabsContent value="customers" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Customer Growth</CardTitle>
              </CardHeader>
              <CardContent className="h-[240px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <TrendingUpIcon className="mx-auto h-12 w-12 mb-2" />
                  <p>Chart would appear here in a real implementation</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Customer Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-muted-foreground">Total Customers</p>
                    <p className="text-2xl font-bold">{customersSummary.total}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Active Customers</p>
                    <p className="text-2xl font-bold">{customersSummary.active}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">New This Month</p>
                    <p className="text-2xl font-bold">{customersSummary.newThisMonth}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Retention Rate</p>
                    <p className="text-2xl font-bold">{customersSummary.retention}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Top Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors data-[state=selected]:bg-muted">
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Customer</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Email</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Orders</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Total Spent</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Last Order</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-3 align-middle font-medium">John Smith</td>
                        <td className="p-3 align-middle">john.smith@example.com</td>
                        <td className="p-3 align-middle">12</td>
                        <td className="p-3 align-middle">$8,750.25</td>
                        <td className="p-3 align-middle">Jun 12, 2023</td>
                      </tr>
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-3 align-middle font-medium">Emma Johnson</td>
                        <td className="p-3 align-middle">emma.j@example.com</td>
                        <td className="p-3 align-middle">8</td>
                        <td className="p-3 align-middle">$5,120.75</td>
                        <td className="p-3 align-middle">Jun 10, 2023</td>
                      </tr>
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-3 align-middle font-medium">Michael Brown</td>
                        <td className="p-3 align-middle">michael.b@example.com</td>
                        <td className="p-3 align-middle">6</td>
                        <td className="p-3 align-middle">$3,890.50</td>
                        <td className="p-3 align-middle">Jun 8, 2023</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="text-xs text-muted-foreground text-center">
        <p>Report data last updated: June 15, 2023 at 10:30 AM</p>
        <p>Note: This is a demo implementation. In a real app, these reports would be generated from your actual database.</p>
      </div>
    </div>
  );
} 