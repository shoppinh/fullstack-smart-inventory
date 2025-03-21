import { customers } from "@/db/schema";

// Define a type based on the DB schema
export type Customer = typeof customers.$inferSelect;

interface PaginationParams {
  limit?: number;
  offset?: number;
  search?: string;
}

interface CustomersResponse {
  customers: Customer[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

export class CustomerService {
  static async getCustomers({ limit = 10, offset = 0, search = "" }: PaginationParams = {}): Promise<CustomersResponse> {
    const searchParams = new URLSearchParams();
    
    if (limit) searchParams.append("limit", limit.toString());
    if (offset) searchParams.append("offset", offset.toString());
    if (search) searchParams.append("search", search);
    
    const response = await fetch(`/api/customers?${searchParams.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching customers: ${response.statusText}`);
    }

    return response.json();
  }

  static async getCustomer(id: string): Promise<Customer> {
    const response = await fetch(`/api/customers/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching customer: ${response.statusText}`);
    }

    return response.json();
  }

  static async createCustomer(customer: Omit<Customer, "id" | "createdAt" | "updatedAt">): Promise<Customer> {
    const response = await fetch("/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    });

    if (!response.ok) {
      throw new Error(`Error creating customer: ${response.statusText}`);
    }

    return response.json();
  }

  static async updateCustomer(id: string, customer: Partial<Customer>): Promise<Customer> {
    const response = await fetch(`/api/customers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    });

    if (!response.ok) {
      throw new Error(`Error updating customer: ${response.statusText}`);
    }

    return response.json();
  }

  static async deleteCustomer(id: string): Promise<Customer> {
    const response = await fetch(`/api/customers/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error deleting customer: ${response.statusText}`);
    }

    return response.json();
  }
} 