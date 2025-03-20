import { relations } from "drizzle-orm";
import { 
  integer, 
  pgTable, 
  text, 
  timestamp, 
  varchar, 
  numeric, 
  uuid,
  boolean
} from "drizzle-orm/pg-core";
import { categories } from "./categories";
import { suppliers } from "./suppliers";
import { inventory } from "./inventory";

export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  sku: varchar("sku", { length: 100 }).notNull().unique(),
  barcode: varchar("barcode", { length: 100 }),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  cost: numeric("cost", { precision: 10, scale: 2 }),
  categoryId: uuid("category_id").references(() => categories.id),
  supplierId: uuid("supplier_id").references(() => suppliers.id),
  minStockLevel: integer("min_stock_level").default(0),
  maxStockLevel: integer("max_stock_level"),
  reorderPoint: integer("reorder_point").default(0),
  weight: numeric("weight", { precision: 10, scale: 2 }),
  dimensions: varchar("dimensions", { length: 100 }),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  supplier: one(suppliers, {
    fields: [products.supplierId],
    references: [suppliers.id],
  }),
  inventory: many(inventory),
})); 