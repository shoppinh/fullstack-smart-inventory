import { relations } from "drizzle-orm";
import { 
  integer, 
  pgTable, 
  timestamp, 
  uuid, 
  varchar,
  text,
  numeric
} from "drizzle-orm/pg-core";
import { products } from "./products";
import { locations } from "./locations";

export const transactionTypes = {
  PURCHASE: "PURCHASE",
  SALE: "SALE",
  TRANSFER: "TRANSFER",
  ADJUSTMENT: "ADJUSTMENT",
  RETURN: "RETURN"
} as const;

export const transactions = pgTable("transactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  type: varchar("type", { length: 50 }).notNull(),
  productId: uuid("product_id").references(() => products.id).notNull(),
  sourceLocationId: uuid("source_location_id").references(() => locations.id),
  destinationLocationId: uuid("destination_location_id").references(() => locations.id),
  quantity: integer("quantity").notNull(),
  unitPrice: numeric("unit_price", { precision: 10, scale: 2 }),
  reference: varchar("reference", { length: 100 }),
  notes: text("notes"),
  createdBy: uuid("created_by"), // Reference to users table could be added later
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const transactionsRelations = relations(transactions, ({ one }) => ({
  product: one(products, {
    fields: [transactions.productId],
    references: [products.id],
  }),
  sourceLocation: one(locations, {
    fields: [transactions.sourceLocationId],
    references: [locations.id],
  }),
  destinationLocation: one(locations, {
    fields: [transactions.destinationLocationId],
    references: [locations.id],
  }),
})); 