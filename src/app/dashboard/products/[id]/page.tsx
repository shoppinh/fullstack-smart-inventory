"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Edit, Trash } from "lucide-react";
import { ProductService, Product } from "@/lib/services/product-service";
import { formatCurrency } from "@/lib/utils";

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      try {
        setIsLoading(true);
        const data = await ProductService.getProduct(params.id);
        setProduct(data);
      } catch (err) {
        console.error("Error loading product:", err);
        setError("Failed to load product details");
      } finally {
        setIsLoading(false);
      }
    }

    loadProduct();
  }, [params.id]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      setIsDeleting(true);
      await ProductService.deleteProduct(params.id);
      router.push("/dashboard/products");
    } catch (err) {
      console.error("Error deleting product:", err);
      setError("Failed to delete product");
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading product details...</div>;
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="rounded-md bg-red-50 p-4 mb-4">
          <div className="text-sm text-red-700">{error}</div>
        </div>
        <Link 
          href="/dashboard/products" 
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Products
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-8">
        <div className="rounded-md bg-yellow-50 p-4 mb-4">
          <div className="text-sm text-yellow-700">Product not found</div>
        </div>
        <Link 
          href="/dashboard/products" 
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link 
            href="/dashboard/products" 
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 mb-2"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Products
          </Link>
          <h2 className="text-2xl font-bold tracking-tight">{product.name}</h2>
          <p className="text-muted-foreground">
            SKU: {product.sku}
          </p>
        </div>
        <div className="flex space-x-2">
          <Link href={`/dashboard/products/${params.id}/edit`}>
            <button className="inline-flex items-center rounded-md bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
              <Edit className="mr-1 h-4 w-4" />
              Edit
            </button>
          </Link>
          <button 
            onClick={handleDelete}
            disabled={isDeleting}
            className="inline-flex items-center rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-700 ring-1 ring-inset ring-red-600/20 disabled:opacity-50"
          >
            <Trash className="mr-1 h-4 w-4" />
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>

      <div className="rounded-md border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          <div className="p-6 space-y-4">
            <div>
              <h3 className="text-lg font-medium">Product Details</h3>
              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-500">Name</p>
                  <p className="mt-1">{product.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Description</p>
                  <p className="mt-1">{product.description || "No description"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">SKU</p>
                  <p className="mt-1">{product.sku}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Barcode</p>
                  <p className="mt-1">{product.barcode || "No barcode"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <p className="mt-1">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      product.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <h3 className="text-lg font-medium">Pricing & Inventory</h3>
              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-500">Price</p>
                  <p className="mt-1">{formatCurrency(Number(product.price))}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Cost</p>
                  <p className="mt-1">{product.cost ? formatCurrency(Number(product.cost)) : "Not specified"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Minimum Stock Level</p>
                  <p className="mt-1">{product.minStockLevel}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Maximum Stock Level</p>
                  <p className="mt-1">{product.maxStockLevel || "Not specified"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Reorder Point</p>
                  <p className="mt-1">{product.reorderPoint}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 p-6 space-y-4">
          <h3 className="text-lg font-medium">Additional Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-500">Weight</p>
              <p className="mt-1">{product.weight ? `${product.weight}` : "Not specified"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Dimensions</p>
              <p className="mt-1">{product.dimensions || "Not specified"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Category</p>
              <p className="mt-1">{product.categoryId || "Uncategorized"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Supplier</p>
              <p className="mt-1">{product.supplierId || "No supplier"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Created</p>
              <p className="mt-1">
                {product.createdAt ? new Date(product.createdAt).toLocaleString() : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Last Updated</p>
              <p className="mt-1">
                {product.updatedAt ? new Date(product.updatedAt).toLocaleString() : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 