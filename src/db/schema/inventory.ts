import { relations } from "drizzle-orm";
import { 
  integer, 
  pgTable, 
  timestamp, 
  uuid,
  varchar
} from "drizzle-orm/pg-core";
import { products } from "./products";
import { locations } from "./locations";

export const inventory = pgTable("inventory", {
  id: uuid("id").primaryKey().defaultRandom(),
  productId: uuid("product_id").references(() => products.id).notNull(),
  locationId: uuid("location_id").references(() => locations.id).notNull(),
  quantity: integer("quantity").notNull().default(0),
  lotNumber: varchar("lot_number", { length: 100 }),
  expirationDate: timestamp("expiration_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const inventoryRelations = relations(inventory, ({ one }) => ({
  product: one(products, {
    fields: [inventory.productId],
    references: [products.id],
  }),
  location: one(locations, {
    fields: [inventory.locationId],
    references: [locations.id],
  }),
})); 