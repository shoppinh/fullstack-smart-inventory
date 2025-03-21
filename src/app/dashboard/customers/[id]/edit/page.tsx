"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, ArrowLeft } from "lucide-react";
import { CustomerService } from "@/lib/services/customer-service";

interface EditCustomerPageProps {
  params: {
    id: string;
  };
}

export default function EditCustomerPage({ params }: EditCustomerPageProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    notes: ""
  });

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        setIsLoading(true);
        const customer = await CustomerService.getCustomer(params.id);
        
        setFormData({
          name: customer.name,
          email: customer.email || "",
          phone: customer.phone || "",
          company: customer.company || "",
          address: customer.address || "",
          city: customer.city || "",
          state: customer.state || "",
          country: customer.country || "",
          zipCode: customer.zipCode || "",
          notes: customer.notes || ""
        });
      } catch (err) {
        console.error("Error fetching customer:", err);
        setError("Failed to load customer data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCustomer();
  }, [params.id]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      setError("Name and email are required fields.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      
      await CustomerService.updateCustomer(params.id, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        company: formData.company || null,
        address: formData.address || null,
        city: formData.city || null,
        state: formData.state || null,
        country: formData.country || null,
        zipCode: formData.zipCode || null,
        notes: formData.notes || null
      });
      
      alert("Customer has been updated successfully.");
      router.push(`/dashboard/customers/${params.id}`);
    } catch (err) {
      console.error("Error updating customer:", err);
      setError("Failed to update customer. Please try again.");
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
    <div className="space-y-6">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="mr-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <h2 className="text-2xl font-bold tracking-tight">Edit Customer</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="border rounded-lg p-6 bg-card space-y-6">
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="required">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="required">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => handleChange("company", e.target.value)}
            />
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              rows={2}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => handleChange("city", e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="state">State/Province</Label>
            <Input
              id="state"
              value={formData.state}
              onChange={(e) => handleChange("state", e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              value={formData.country}
              onChange={(e) => handleChange("country", e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="zipCode">ZIP/Postal Code</Label>
            <Input
              id="zipCode"
              value={formData.zipCode}
              onChange={(e) => handleChange("zipCode", e.target.value)}
            />
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              rows={4}
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
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
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
} 