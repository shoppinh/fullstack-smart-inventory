"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useCallback } from "react";
import { InventoryItem, InventoryService } from "@/lib/services/inventory-service";

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterProductId, setFilterProductId] = useState<string | null>(null);
  const [filterLocationId, setFilterLocationId] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    limit: 10,
    offset: 0,
    hasMore: false
  });

  const fetchInventory = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await InventoryService.getInventory({
        limit: pagination.limit,
        offset: pagination.offset,
        productId: filterProductId || undefined,
        locationId: filterLocationId || undefined
      });
      
      setInventory(response.inventory);
      setPagination(response.pagination);
    } catch (err) {
      console.error("Error fetching inventory:", err);
      setError("Failed to load inventory. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [pagination.limit, pagination.offset, filterProductId, filterLocationId]);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  const handleNextPage = () => {
    setPagination(prev => ({
      ...prev,
      offset: prev.offset + prev.limit
    }));
  };

  const handlePreviousPage = () => {
    setPagination(prev => ({
      ...prev,
      offset: Math.max(0, prev.offset - prev.limit)
    }));
  };

  const formatDate = (dateString: string | Date | null | undefined) => {
    if (!dateString) return "-";
    try {
      const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return "-";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Inventory</h2>
          <p className="text-muted-foreground">
            Track and manage your inventory across locations
          </p>
        </div>
        <Link href="/dashboard/inventory/new">
          <Button className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            <span>Add Inventory</span>
          </Button>
        </Link>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="w-full max-w-sm">
          <label className="text-sm font-medium">Filter by Product</label>
          <select
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
            value={filterProductId || ""}
            onChange={(e) => setFilterProductId(e.target.value || null)}
          >
            <option value="">All Products</option>
            {/* You would typically fetch this from ProductService */}
            <option value="1">Laptop</option>
            <option value="2">Wireless Mouse</option>
            <option value="3">T-Shirt</option>
          </select>
        </div>
        
        <div className="w-full max-w-sm">
          <label className="text-sm font-medium">Filter by Location</label>
          <select
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
            value={filterLocationId || ""}
            onChange={(e) => setFilterLocationId(e.target.value || null)}
          >
            <option value="">All Locations</option>
            {/* You would typically fetch this from LocationService */}
            <option value="1">Main Warehouse</option>
            <option value="2">West Coast Warehouse</option>
            <option value="3">East Coast Warehouse</option>
          </select>
        </div>
      </div>
      
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="text-sm text-red-700">{error}</div>
        </div>
      )}
      
      <div className="rounded-md border">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors data-[state=selected]:bg-muted">
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Product</th>
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Location</th>
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Quantity</th>
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Lot/Batch</th>
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Expiration</th>
                <th className="h-10 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="p-4 text-center">Loading inventory...</td>
                </tr>
              ) : inventory.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-4 text-center">No inventory found</td>
                </tr>
              ) : (
                inventory.map((item) => (
                  <tr key={item.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-4 align-middle font-medium">{item.product?.name || item.productId}</td>
                    <td className="p-4 align-middle">{item.location?.name || item.locationId}</td>
                    <td className="p-4 align-middle">{item.quantity}</td>
                    <td className="p-4 align-middle">{item.lotNumber || "-"}</td>
                    <td className="p-4 align-middle">{formatDate(item.expirationDate)}</td>
                    <td className="p-4 align-middle text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/dashboard/inventory/${item.id}/edit`}>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </Link>
                        <Link href={`/dashboard/inventory/${item.id}`}>
                          <Button variant="ghost" size="sm">View</Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {pagination.total > 0 ? (
            <span>
              Showing <strong>{pagination.offset + 1}-{Math.min(pagination.offset + pagination.limit, pagination.total)}</strong> of <strong>{pagination.total}</strong> items
            </span>
          ) : (
            <span>No inventory items found</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handlePreviousPage}
            disabled={pagination.offset === 0 || isLoading}
          >
            Previous
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleNextPage}
            disabled={!pagination.hasMore || isLoading}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
} 