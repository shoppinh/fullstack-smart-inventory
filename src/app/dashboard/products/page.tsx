import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Products</h2>
          <p className="text-muted-foreground">
            Manage your product catalog
          </p>
        </div>
        <Link href="/dashboard/products/new">
          <Button className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            <span>Add Product</span>
          </Button>
        </Link>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search products..."
            className="w-full rounded-md border border-input bg-background py-2 pl-8 pr-3 text-sm outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
        <Button variant="outline">Filter</Button>
      </div>
      
      <div className="rounded-md border">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors data-[state=selected]:bg-muted">
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">SKU</th>
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Category</th>
                <th className="h-10 px-4 text-right align-middle font-medium text-muted-foreground">Price</th>
                <th className="h-10 px-4 text-right align-middle font-medium text-muted-foreground">Stock</th>
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                <th className="h-10 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {generateProducts().map((product) => (
                <tr key={product.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <td className="p-4 align-middle">{product.sku}</td>
                  <td className="p-4 align-middle font-medium">{product.name}</td>
                  <td className="p-4 align-middle">{product.category}</td>
                  <td className="p-4 align-middle text-right">${product.price.toFixed(2)}</td>
                  <td className="p-4 align-middle text-right">{product.stock}</td>
                  <td className="p-4 align-middle">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      product.status === 'In Stock' 
                        ? 'bg-green-100 text-green-800' 
                        : product.status === 'Low Stock'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="p-4 align-middle text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>42</strong> products
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </div>
  );
}

// Mock data generator
function generateProducts() {
  const products = [];
  const categories = ["Electronics", "Office Supplies", "Furniture", "Kitchen", "Apparel"];
  const statuses = ["In Stock", "Low Stock", "Out of Stock"];
  
  for (let i = 1; i <= 10; i++) {
    const categoryIndex = Math.floor(Math.random() * categories.length);
    const statusIndex = Math.floor(Math.random() * statuses.length);
    const stock = statusIndex === 0 ? Math.floor(Math.random() * 100) + 30 : 
                 statusIndex === 1 ? Math.floor(Math.random() * 20) + 1 : 0;
    
    products.push({
      id: i,
      name: `Product ${i}`,
      sku: `SKU-${1000 + i}`,
      category: categories[categoryIndex],
      price: (Math.random() * 500 + 10),
      stock,
      status: statuses[statusIndex]
    });
  }
  
  return products;
} 