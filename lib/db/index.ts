import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const client = neon(process.env.DATABASE_URL!);

const DB = drizzle({ client, schema });

export default DB;
