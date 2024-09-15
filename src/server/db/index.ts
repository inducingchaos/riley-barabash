/**
 *
 */

import { Client } from "@planetscale/database"
import { drizzle } from "drizzle-orm/planetscale-serverless"
import { application } from "~/config"
import * as kyzn from "./schemas/projects/kyzn"
import * as rileyBarabash from "./schemas/projects/riley-barabash"

export const db = drizzle(
    new Client({
        host: application.credentials.public.database.host,
        username: application.credentials.public.database.username,
        password: application.credentials.private.database.password
    }),
    { schema: { ...kyzn, ...rileyBarabash } }
)

export type Drizzle = typeof db
