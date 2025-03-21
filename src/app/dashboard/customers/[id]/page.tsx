"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { Customer, CustomerService } from "@/lib/services/customer-service";
import Link from "next/link";

interface CustomerDetailsPageProps {
  params: {
    id: string;
  };
}

export default function CustomerDetailsPage({ params }: CustomerDetailsPageProps) {
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        setIsLoading(true);
        const data = await CustomerService.getCustomer(params.id);
        setCustomer(data);
      } catch (err) {
        console.error("Error fetching customer:", err);
        setError("Failed to load customer details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomer();
  }, [params.id]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this customer? This action cannot be undone.")) {
      return;
    }

    try {
      setIsDeleting(true);
      await CustomerService.deleteCustomer(params.id);
      alert("Customer deleted successfully.");
      router.push("/dashboard/customers");
    } catch (err) {
      console.error("Error deleting customer:", err);
      setError("Failed to delete customer. Please try again.");
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !customer) {
    return (
      <div className="space-y-4">
        <Button
          variant="ghost"
          size="sm"
          className="mb-4"
          onClick={() => router.push("/dashboard/customers")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Customers
        </Button>
        
        <div className="rounded-md bg-red-50 p-4">
          <div className="text-sm text-red-700">
            {error || "Customer not found."}
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
          onClick={() => router.push("/dashboard/customers")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Customers
        </Button>
        
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/customers/${params.id}/edit`}>
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
        <h2 className="text-xl font-bold mb-6">Customer Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
              <p className="text-base font-medium">{customer.name}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
              <p className="text-base">{customer.email}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
              <p className="text-base">{customer.phone || "-"}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Company</h3>
              <p className="text-base">{customer.company || "-"}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Address</h3>
              <p className="text-base">{customer.address || "-"}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">City</h3>
                <p className="text-base">{customer.city || "-"}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">State</h3>
                <p className="text-base">{customer.state || "-"}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Country</h3>
                <p className="text-base">{customer.country || "-"}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">ZIP Code</h3>
                <p className="text-base">{customer.zipCode || "-"}</p>
              </div>
            </div>
          </div>
        </div>
        
        {customer.notes && (
          <div className="mt-6 pt-6 border-t">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Notes</h3>
            <p className="text-base whitespace-pre-line">{customer.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
} 