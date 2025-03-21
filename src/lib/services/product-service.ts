import { products } from "@/db/schema";

// Define a type based on the DB schema
export type Product = typeof products.$inferSelect;

export interface GetProductsOptions {
  limit?: number;
  offset?: number;
  search?: string;
}

export interface ProductsResponse {
  products: Product[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

export const ProductService = {
  async getProducts({ limit = 10, offset = 0, search = "" }: GetProductsOptions = {}): Promise<ProductsResponse> {
    const params = new URLSearchParams();
    if (limit) params.append("limit", limit.toString());
    if (offset) params.append("offset", offset.toString());
    if (search) params.append("search", search);
    
    const response = await fetch(`/api/products?${params}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }
    
    return response.json();
  },
  
  async getProduct(id: string): Promise<Product> {
    const response = await fetch(`/api/products/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.statusText}`);
    }
    
    return response.json();
  },
  
  async createProduct(data: Omit<Product, "id" | "createdAt" | "updatedAt">): Promise<Product> {
    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create product: ${response.statusText}`);
    }
    
    return response.json();
  },
  
  async updateProduct(id: string, data: Partial<Omit<Product, "id" | "createdAt" | "updatedAt">>): Promise<Product> {
    const response = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update product: ${response.statusText}`);
    }
    
    return response.json();
  },
  
  async deleteProduct(id: string): Promise<Product> {
    const response = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete product: ${response.statusText}`);
    }
    
    return response.json();
  }
}; 