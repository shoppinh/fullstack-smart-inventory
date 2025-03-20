import { relations } from "drizzle-orm";
import { 
  pgTable, 
  text, 
  timestamp, 
  varchar, 
  uuid 
} from "drizzle-orm/pg-core";
import { products } from "./products";

export const suppliers = pgTable("suppliers", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  contactName: varchar("contact_name", { length: 255 }),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 50 }),
  address: text("address"),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 100 }),
  country: varchar("country", { length: 100 }),
  zipCode: varchar("zip_code", { length: 20 }),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const suppliersRelations = relations(suppliers, ({ many }) => ({
  products: many(products),
})); 