"use client";

import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useCallback } from "react";
import { Supplier, SupplierService } from "@/lib/services/supplier-service";

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({
    total: 0,
    limit: 10,
    offset: 0,
    hasMore: false
  });

  const fetchSuppliers = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await SupplierService.getSuppliers({
        limit: pagination.limit,
        offset: pagination.offset,
        search: searchTerm
      });
      
      setSuppliers(response.suppliers);
      setPagination(response.pagination);
    } catch (err) {
      console.error("Error fetching suppliers:", err);
      setError("Failed to load suppliers. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [pagination.limit, pagination.offset, searchTerm]);

  useEffect(() => {
    fetchSuppliers();
  }, [fetchSuppliers]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSuppliers();
  };

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Suppliers</h2>
          <p className="text-muted-foreground">
            Manage your suppliers
          </p>
        </div>
        <Link href="/dashboard/suppliers/new">
          <Button className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            <span>Add Supplier</span>
          </Button>
        </Link>
      </div>
      
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search suppliers..."
            className="w-full rounded-md border border-input bg-background py-2 pl-8 pr-3 text-sm outline-none focus:ring-1 focus:ring-ring"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" type="submit">Search</Button>
      </form>
      
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
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Contact</th>
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Email</th>
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Phone</th>
                <th className="h-10 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="p-4 text-center">Loading suppliers...</td>
                </tr>
              ) : suppliers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-4 text-center">No suppliers found</td>
                </tr>
              ) : (
                suppliers.map((supplier) => (
                  <tr key={supplier.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-4 align-middle font-medium">{supplier.name}</td>
                    <td className="p-4 align-middle">{supplier.contactName || "-"}</td>
                    <td className="p-4 align-middle">{supplier.email || "-"}</td>
                    <td className="p-4 align-middle">{supplier.phone || "-"}</td>
                    <td className="p-4 align-middle text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/dashboard/suppliers/${supplier.id}/edit`}>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </Link>
                        <Link href={`/dashboard/suppliers/${supplier.id}`}>
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
              Showing <strong>{pagination.offset + 1}-{Math.min(pagination.offset + pagination.limit, pagination.total)}</strong> of <strong>{pagination.total}</strong> suppliers
            </span>
          ) : (
            <span>No suppliers found</span>
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