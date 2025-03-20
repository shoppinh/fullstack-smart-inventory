import { db } from "./index";
import { products } from "./schema";

async function main() {
  console.log("Seeding database...");
  
  const sampleProducts = [
    {
      name: "Laptop",
      description: "High-performance laptop for professionals",
      sku: "TECH-1001",
      price: "999.99",
      minStockLevel: 5,
      reorderPoint: 10,
      isActive: true
    },
    {
      name: "Wireless Mouse",
      description: "Ergonomic wireless mouse",
      sku: "TECH-1002",
      price: "49.99",
      minStockLevel: 20,
      reorderPoint: 30,
      isActive: true
    },
    // Add more sample products as needed
  ];
  
  // Insert the sample products
  for (const product of sampleProducts) {
    await db.insert(products).values(product).onConflictDoNothing({ target: products.sku });
  }
  
  console.log("Seeding completed!");
  process.exit(0);
}

main().catch((e) => {
  console.error("Seeding failed:", e);
  process.exit(1);
});
