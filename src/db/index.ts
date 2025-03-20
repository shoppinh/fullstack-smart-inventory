import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import "dotenv/config";


// For development with local postgres
const connectionString = process.env.DATABASE_URL ?? "";
// For production with Vercel Postgres
// import { sql } from '@vercel/postgres';
// export const db = drizzle(sql, { schema });

// For local development
export const client = postgres(connectionString);
export const db = drizzle(client, { schema });

export type Schema = typeof schema; 