import { products } from "@/db/schema";

// Define a type based on the DB schema
export type Product = typeof products.$inferSelect;

interface PaginationParams {
  limit?: number;
  offset?: number;
  search?: string;
}

interface ProductsResponse {
  products: Product[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

export class ProductService {
  static async getProducts({ limit = 10, offset = 0, search = "" }: PaginationParams = {}): Promise<ProductsResponse> {
    const searchParams = new URLSearchParams();
    
    if (limit) searchParams.append("limit", limit.toString());
    if (offset) searchParams.append("offset", offset.toString());
    if (search) searchParams.append("search", search);
    
    const response = await fetch(`/api/products?${searchParams.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.statusText}`);
    }

    return response.json();
  }

  static async getProduct(id: string): Promise<Product> {
    const response = await fetch(`/api/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching product: ${response.statusText}`);
    }

    return response.json();
  }

  static async createProduct(product: Omit<Product, "id" | "createdAt" | "updatedAt">): Promise<Product> {
    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error(`Error creating product: ${response.statusText}`);
    }

    return response.json();
  }

  static async updateProduct(id: string, product: Partial<Product>): Promise<Product> {
    const response = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error(`Error updating product: ${response.statusText}`);
    }

    return response.json();
  }

  static async deleteProduct(id: string): Promise<Product> {
    const response = await fetch(`/api/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error deleting product: ${response.statusText}`);
    }

    return response.json();
  }
} 