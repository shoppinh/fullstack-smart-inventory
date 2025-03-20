import { relations } from "drizzle-orm";
import { 
  pgTable, 
  text, 
  timestamp, 
  varchar, 
  uuid,
  boolean
} from "drizzle-orm/pg-core";
import { inventory } from "./inventory";

export const locations = pgTable("locations", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  type: varchar("type", { length: 50 }), // warehouse, shelf, bin, etc.
  address: text("address"),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 100 }),
  country: varchar("country", { length: 100 }),
  zipCode: varchar("zip_code", { length: 20 }),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const locationsRelations = relations(locations, ({ many }) => ({
  inventory: many(inventory),
})); 