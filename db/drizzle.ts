import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { config } from "dotenv";
config({ path: ".env.local" }); // or .env.local
import * as schema from './schema'

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

export default db;

