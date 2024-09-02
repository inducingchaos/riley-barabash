/**
 * @file Creates a connection to the database.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #server
 * #db
 * #index
 * #database
 * #drizzle
 * #mysql
 * #planetscale
 */

import { Client } from "@planetscale/database"
import { drizzle } from "drizzle-orm/planetscale-serverless"
import { application } from "~/config"
import * as schema from "./schemas"

export const db = drizzle(
    new Client({
        host: application.credentials.public.database.host,
        username: application.credentials.public.database.username,
        password: application.credentials.private.database.password
    }),
    { schema }
)

export type Drizzle = typeof db

export { schema }
