import { relations } from "drizzle-orm";
import { 
  pgTable, 
  text, 
  timestamp, 
  varchar, 
  uuid 
} from "drizzle-orm/pg-core";
import { products } from "./products";

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
})); 