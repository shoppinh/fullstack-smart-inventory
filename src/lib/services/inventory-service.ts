import { inventory } from "@/db/schema";

// Define a type based on the DB schema
export type InventoryItem = typeof inventory.$inferSelect & {
  product?: {
    id: string;
    name: string;
    sku: string;
  };
  location?: {
    id: string;
    name: string;
  };
};

export interface GetInventoryOptions {
  limit?: number;
  offset?: number;
  productId?: string;
  locationId?: string;
}

export interface InventoryResponse {
  inventory: InventoryItem[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

export const InventoryService = {
  async getInventory({ limit = 10, offset = 0, productId, locationId }: GetInventoryOptions = {}): Promise<InventoryResponse> {
    const params = new URLSearchParams();
    if (limit) params.append("limit", limit.toString());
    if (offset) params.append("offset", offset.toString());
    if (productId) params.append("productId", productId);
    if (locationId) params.append("locationId", locationId);
    
    const response = await fetch(`/api/inventory?${params}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch inventory: ${response.statusText}`);
    }
    
    return response.json();
  },
  
  async getInventoryItem(id: string): Promise<InventoryItem> {
    const response = await fetch(`/api/inventory/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch inventory item: ${response.statusText}`);
    }
    
    return response.json();
  },
  
  async createInventoryItem(data: Omit<InventoryItem, "id" | "createdAt" | "updatedAt" | "product" | "location">): Promise<InventoryItem> {
    const response = await fetch("/api/inventory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create inventory item: ${response.statusText}`);
    }
    
    return response.json();
  },
  
  async updateInventoryItem(id: string, data: Partial<Omit<InventoryItem, "id" | "createdAt" | "updatedAt" | "product" | "location">>): Promise<InventoryItem> {
    const response = await fetch(`/api/inventory/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update inventory item: ${response.statusText}`);
    }
    
    return response.json();
  },
  
  async deleteInventoryItem(id: string): Promise<InventoryItem> {
    const response = await fetch(`/api/inventory/${id}`, {
      method: "DELETE",
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete inventory item: ${response.statusText}`);
    }
    
    return response.json();
  }
}; 