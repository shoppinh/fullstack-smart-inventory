"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InventoryService } from "@/lib/services/inventory-service";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function NewInventoryPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<{ id: string; name: string }[]>([]);
  const [locations, setLocations] = useState<{ id: string; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    productId: "",
    locationId: "",
    quantity: 0,
    lotNumber: "",
    expirationDate: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // In a real app, you would fetch products and locations from your API
        // For now, we'll use mock data
        setProducts([
          { id: "1", name: "Laptop" },
          { id: "2", name: "Wireless Mouse" },
          { id: "3", name: "T-Shirt" }
        ]);
        
        setLocations([
          { id: "1", name: "Main Warehouse" },
          { id: "2", name: "West Coast Warehouse" },
          { id: "3", name: "East Coast Warehouse" }
        ]);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load required data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.productId || !formData.locationId || formData.quantity <= 0) {
      setError("Please fill all required fields with valid values.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      
      await InventoryService.createInventoryItem({
        productId: formData.productId,
        locationId: formData.locationId,
        quantity: formData.quantity,
        lotNumber: formData.lotNumber || null,
        expirationDate: formData.expirationDate ? new Date(formData.expirationDate) : null
      });
      
      alert("Inventory item has been created successfully.");
      
      router.push("/dashboard/inventory");
    } catch (err) {
      console.error("Error creating inventory item:", err);
      setError("Failed to create inventory item. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="mb-6 text-2xl font-bold tracking-tight">Add Inventory Item</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6 border rounded-lg p-6 bg-card">
        <div>
          <h3 className="text-lg font-medium mb-4">Inventory Information</h3>
        
          {error && (
            <div className="rounded-md bg-red-50 p-4 mb-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="product">Product *</Label>
              <select
                id="product"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                value={formData.productId}
                onChange={(e) => handleChange("productId", e.target.value)}
                required
              >
                <option value="">Select a product</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <select
                id="location"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                value={formData.locationId}
                onChange={(e) => handleChange("locationId", e.target.value)}
                required
              >
                <option value="">Select a location</option>
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity *</Label>
              <Input
                id="quantity"
                type="number"
                min="0"
                value={formData.quantity}
                onChange={(e) => handleChange("quantity", parseInt(e.target.value) || 0)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lotNumber">Lot/Batch Number</Label>
              <Input
                id="lotNumber"
                type="text"
                value={formData.lotNumber}
                onChange={(e) => handleChange("lotNumber", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="expirationDate">Expiration Date</Label>
              <Input
                id="expirationDate"
                type="date"
                value={formData.expirationDate}
                onChange={(e) => handleChange("expirationDate", e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard/inventory")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Item"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
} 