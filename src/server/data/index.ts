/**
 *
 */

import { Client } from "@planetscale/database"
import { drizzle } from "drizzle-orm/planetscale-serverless"
import { application } from "~/config"
import * as kyzn from "./schemas/kyzn"
import * as rileyBarabash from "./schemas/riley-barabash"
import * as shared from "./schemas/shared"

export const schema = { ...kyzn, ...rileyBarabash, ...shared }

export const connection = new Client({
    host: application.credentials.public.database.host,
    username: application.credentials.public.database.username,
    password: application.credentials.private.database.password
})

export const db = drizzle(connection, { schema })

export type Database = typeof db
