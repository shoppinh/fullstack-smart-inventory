import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import * as schema from "./schema";
import "dotenv/config";

// For local development and migrations
const connectionString = process.env.DATABASE_URL ?? "";
const migrationClient = postgres(connectionString, { max: 1 });

async function main() {
  console.log("Running migrations...");
  
  const db = drizzle(migrationClient, { schema });
  
  await migrate(db, { migrationsFolder: "src/db/migrations" });
  
  console.log("Migrations completed!");
  process.exit(0);
}

main().catch((e) => {
  console.error("Migration failed:", e);
  process.exit(1);
});
