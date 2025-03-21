import { suppliers } from "@/db/schema";

// Define a type based on the DB schema
export type Supplier = typeof suppliers.$inferSelect;

export interface GetSuppliersOptions {
  limit?: number;
  offset?: number;
  search?: string;
}

export interface SuppliersResponse {
  suppliers: Supplier[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

export const SupplierService = {
  async getSuppliers({ limit = 10, offset = 0, search = "" }: GetSuppliersOptions = {}): Promise<SuppliersResponse> {
    const params = new URLSearchParams();
    if (limit) params.append("limit", limit.toString());
    if (offset) params.append("offset", offset.toString());
    if (search) params.append("search", search);
    
    const response = await fetch(`/api/suppliers?${params}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch suppliers: ${response.statusText}`);
    }
    
    return response.json();
  },
  
  async getSupplier(id: string): Promise<Supplier> {
    const response = await fetch(`/api/suppliers/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch supplier: ${response.statusText}`);
    }
    
    return response.json();
  },
  
  async createSupplier(data: Omit<Supplier, "id" | "createdAt" | "updatedAt">): Promise<Supplier> {
    const response = await fetch("/api/suppliers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create supplier: ${response.statusText}`);
    }
    
    return response.json();
  },
  
  async updateSupplier(id: string, data: Partial<Omit<Supplier, "id" | "createdAt" | "updatedAt">>): Promise<Supplier> {
    const response = await fetch(`/api/suppliers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update supplier: ${response.statusText}`);
    }
    
    return response.json();
  },
  
  async deleteSupplier(id: string): Promise<Supplier> {
    const response = await fetch(`/api/suppliers/${id}`, {
      method: "DELETE",
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete supplier: ${response.statusText}`);
    }
    
    return response.json();
  }
}; 