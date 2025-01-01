/**
 *
 */

import { Client } from "@planetscale/database"
import { drizzle } from "drizzle-orm/planetscale-serverless"
import { application } from "~/config"
import * as kyzn from "./schemas/kyzn"
import * as iiinput from "./schemas/iiinput"
import * as rileyBarabash from "./schemas/riley-barabash"
import * as shared from "./schemas/shared"

// what if we didn't spread each so that db.query would be usable?

export const schema = { ...kyzn, ...iiinput, ...rileyBarabash, ...shared }

export const connection = new Client({
    host: application.credentials.public.database.host,
    username: application.credentials.public.database.username,
    password: application.credentials.private.database.password
})

export const db = drizzle(connection, { schema })

export type Database = typeof db
