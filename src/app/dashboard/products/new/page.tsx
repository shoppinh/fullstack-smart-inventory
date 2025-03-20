"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProductService } from "@/lib/services/product-service";

export default function NewProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sku: "",
    barcode: "",
    price: "",
    cost: "",
    categoryId: "",
    supplierId: "",
    minStockLevel: "0",
    maxStockLevel: "",
    reorderPoint: "0",
    weight: "",
    dimensions: "",
    isActive: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const productData = {
        name: formData.name,
        description: formData.description || null,
        sku: formData.sku,
        barcode: formData.barcode || null,
        price: formData.price,
        cost: formData.cost || null,
        categoryId: formData.categoryId || null,
        supplierId: formData.supplierId || null,
        minStockLevel: parseInt(formData.minStockLevel) || 0,
        maxStockLevel: formData.maxStockLevel ? parseInt(formData.maxStockLevel) : null,
        reorderPoint: parseInt(formData.reorderPoint) || 0,
        weight: formData.weight || null,
        dimensions: formData.dimensions || null,
        isActive: formData.isActive
      };

      await ProductService.createProduct(productData);
      router.push("/dashboard/products");
    } catch (err) {
      console.error("Error creating product:", err);
      setError("Failed to create product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <h2 className="text-2xl font-bold tracking-tight">Add New Product</h2>
          <p className="text-muted-foreground">
            Create a new product in your inventory
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="text-sm text-red-700">{error}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Product Name
            </label>
            <input
              id="name"
              name="name"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="sku" className="text-sm font-medium">
              SKU
            </label>
            <input
              id="sku"
              name="sku"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              value={formData.sku}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="barcode" className="text-sm font-medium">
              Barcode (Optional)
            </label>
            <input
              id="barcode"
              name="barcode"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              value={formData.barcode}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="price" className="text-sm font-medium">
              Price
            </label>
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="cost" className="text-sm font-medium">
              Cost (Optional)
            </label>
            <input
              id="cost"
              name="cost"
              type="number"
              step="0.01"
              min="0"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              value={formData.cost}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="categoryId" className="text-sm font-medium">
              Category ID (Optional)
            </label>
            <input
              id="categoryId"
              name="categoryId"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              value={formData.categoryId}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="supplierId" className="text-sm font-medium">
              Supplier ID (Optional)
            </label>
            <input
              id="supplierId"
              name="supplierId"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              value={formData.supplierId}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="minStockLevel" className="text-sm font-medium">
              Minimum Stock Level
            </label>
            <input
              id="minStockLevel"
              name="minStockLevel"
              type="number"
              min="0"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              value={formData.minStockLevel}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="maxStockLevel" className="text-sm font-medium">
              Maximum Stock Level (Optional)
            </label>
            <input
              id="maxStockLevel"
              name="maxStockLevel"
              type="number"
              min="0"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              value={formData.maxStockLevel}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="reorderPoint" className="text-sm font-medium">
              Reorder Point
            </label>
            <input
              id="reorderPoint"
              name="reorderPoint"
              type="number"
              min="0"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              value={formData.reorderPoint}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="weight" className="text-sm font-medium">
              Weight (Optional)
            </label>
            <input
              id="weight"
              name="weight"
              type="number"
              step="0.01"
              min="0"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              value={formData.weight}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="dimensions" className="text-sm font-medium">
              Dimensions (Optional)
            </label>
            <input
              id="dimensions"
              name="dimensions"
              placeholder="e.g. 10x20x30 cm"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              value={formData.dimensions}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description (Optional)
            </label>
            <textarea
              id="description"
              name="description"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={formData.isActive}
              onChange={handleCheckboxChange}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="isActive" className="text-sm font-medium">
              Active
            </label>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Link href="/dashboard/products">
            <button
              type="button"
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Creating..." : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
