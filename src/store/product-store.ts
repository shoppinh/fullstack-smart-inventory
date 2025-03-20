import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Product {
  id: string;
  name: string;
  description?: string;
  sku: string;
  barcode?: string;
  price: number;
  cost?: number;
  categoryId?: string;
  supplierId?: string;
  minStockLevel: number;
  maxStockLevel?: number;
  reorderPoint: number;
  weight?: number;
  dimensions?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchProducts: () => Promise<void>;
  getProduct: (id: string) => Promise<void>;
  createProduct: (product: Omit<Product, "id" | "createdAt" | "updatedAt">) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  setSelectedProduct: (product: Product | null) => void;
}

// Mock API functions - would be replaced with real API calls
const mockFetchProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          name: "Product 1",
          sku: "SKU001",
          price: 19.99,
          minStockLevel: 10,
          reorderPoint: 5,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }, 500);
  });
};

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: [],
      selectedProduct: null,
      isLoading: false,
      error: null,
      
      fetchProducts: async () => {
        set({ isLoading: true, error: null });
        try {
          const products = await mockFetchProducts();
          set({ products, isLoading: false });
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
        }
      },
      
      getProduct: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
          // In a real app, this would be an API call
          const product = get().products.find(p => p.id === id) || null;
          set({ selectedProduct: product, isLoading: false });
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
        }
      },
      
      createProduct: async (product) => {
        set({ isLoading: true, error: null });
        try {
          // In a real app, this would be an API call
          const newProduct: Product = {
            ...product,
            id: Math.random().toString(36).substring(2, 9),
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          set(state => ({ 
            products: [...state.products, newProduct], 
            isLoading: false 
          }));
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
        }
      },
      
      updateProduct: async (id, product) => {
        set({ isLoading: true, error: null });
        try {
          // In a real app, this would be an API call
          set(state => ({
            products: state.products.map(p => 
              p.id === id ? { ...p, ...product, updatedAt: new Date() } : p
            ),
            isLoading: false
          }));
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
        }
      },
      
      deleteProduct: async (id) => {
        set({ isLoading: true, error: null });
        try {
          // In a real app, this would be an API call
          set(state => ({
            products: state.products.filter(p => p.id !== id),
            isLoading: false
          }));
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
        }
      },
      
      setSelectedProduct: (product) => {
        set({ selectedProduct: product });
      },
    }),
    {
      name: "product-store",
      partialize: (state) => ({ products: state.products }),
    }
  )
); 