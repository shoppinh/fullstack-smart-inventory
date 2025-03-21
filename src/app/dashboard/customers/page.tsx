"use client";

import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState, useCallback } from "react";
import { Customer, CustomerService } from "@/lib/services/customer-service";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({
    total: 0,
    limit: 10,
    offset: 0,
    hasMore: false
  });

  const fetchCustomers = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await CustomerService.getCustomers({
        limit: pagination.limit,
        offset: pagination.offset,
        search: searchTerm || undefined
      });
      
      setCustomers(response.customers);
      setPagination(response.pagination);
    } catch (err) {
      console.error("Error fetching customers:", err);
      setError("Failed to load customers. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [pagination.limit, pagination.offset, searchTerm]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPagination(prev => ({
      ...prev,
      offset: 0 // Reset to first page on new search
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Customers</h2>
          <p className="text-muted-foreground">
            Manage your customer database and relationships
          </p>
        </div>
        <Link href="/dashboard/customers/new">
          <Button className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            <span>Add Customer</span>
          </Button>
        </Link>
      </div>
      
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search customers by name, email, or company..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button type="submit">Search</Button>
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
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Email</th>
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Phone</th>
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Company</th>
                <th className="h-10 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="p-4 text-center">Loading customers...</td>
                </tr>
              ) : customers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-4 text-center">
                    {searchTerm ? "No customers found matching your search" : "No customers found"}
                  </td>
                </tr>
              ) : (
                customers.map((customer) => (
                  <tr key={customer.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-4 align-middle font-medium">{customer.name}</td>
                    <td className="p-4 align-middle">{customer.email}</td>
                    <td className="p-4 align-middle">{customer.phone || "-"}</td>
                    <td className="p-4 align-middle">{customer.company || "-"}</td>
                    <td className="p-4 align-middle text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/dashboard/customers/${customer.id}/edit`}>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </Link>
                        <Link href={`/dashboard/customers/${customer.id}`}>
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
              Showing <strong>{pagination.offset + 1}-{Math.min(pagination.offset + pagination.limit, pagination.total)}</strong> of <strong>{pagination.total}</strong> customers
            </span>
          ) : (
            <span>No customers found</span>
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