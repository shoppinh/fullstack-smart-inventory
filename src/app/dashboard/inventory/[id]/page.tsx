"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { InventoryItem, InventoryService } from "@/lib/services/inventory-service";
import Link from "next/link";

interface InventoryDetailsPageProps {
  params: {
    id: string;
  };
}

export default function InventoryDetailsPage({ params }: InventoryDetailsPageProps) {
  const router = useRouter();
  const [inventoryItem, setInventoryItem] = useState<InventoryItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchInventoryItem = async () => {
      try {
        setIsLoading(true);
        const item = await InventoryService.getInventoryItem(params.id);
        setInventoryItem(item);
      } catch (err) {
        console.error("Error fetching inventory item:", err);
        setError("Failed to load inventory item details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInventoryItem();
  }, [params.id]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this inventory item? This action cannot be undone.")) {
      return;
    }

    try {
      setIsDeleting(true);
      await InventoryService.deleteInventoryItem(params.id);
      alert("Inventory item deleted successfully.");
      router.push("/dashboard/inventory");
    } catch (err) {
      console.error("Error deleting inventory item:", err);
      setError("Failed to delete inventory item. Please try again.");
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString: string | Date | null | undefined) => {
    if (!dateString) return "-";
    try {
      const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return "-";
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !inventoryItem) {
    return (
      <div className="space-y-4">
        <Button
          variant="ghost"
          size="sm"
          className="mb-4"
          onClick={() => router.push("/dashboard/inventory")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Inventory
        </Button>
        
        <div className="rounded-md bg-red-50 p-4">
          <div className="text-sm text-red-700">
            {error || "Inventory item not found."}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/dashboard/inventory")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Inventory
        </Button>
        
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/inventory/${params.id}/edit`}>
            <Button variant="outline" size="sm">
              <Pencil className="mr-2 h-4 w-4" /> Edit
            </Button>
          </Link>
          <Button 
            variant="destructive" 
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Deleting...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </>
            )}
          </Button>
        </div>
      </div>
      
      <div className="border rounded-lg p-6 bg-card">
        <h2 className="text-xl font-bold mb-6">Inventory Item Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Product</h3>
              <p className="text-base font-medium">{inventoryItem.product?.name || inventoryItem.productId}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
              <p className="text-base font-medium">{inventoryItem.location?.name || inventoryItem.locationId}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Quantity</h3>
              <p className="text-base font-medium">{inventoryItem.quantity}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Lot/Batch Number</h3>
              <p className="text-base font-medium">{inventoryItem.lotNumber || "-"}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Expiration Date</h3>
              <p className="text-base font-medium">{formatDate(inventoryItem.expirationDate)}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Last Updated</h3>
              <p className="text-base font-medium">{formatDate(inventoryItem.updatedAt)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 