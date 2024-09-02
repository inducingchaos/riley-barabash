/**
 * @file Configures the Drizzle ORM.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #drizzle
 * #config
 * #database
 */

import { type Config } from "drizzle-kit"
import { application } from "~/config"
import { createUrl } from "~/utils/db/connection/planetscale"
import { createTableName } from "~/utils/db/schema"

export default {
    schema: "./src/server/db/schemas/index.ts",
    dialect: "mysql",
    dbCredentials: {
        //  Drizzle Kit seems to contain a bug with the user/password connection method, so we have to connect using a connection string.

        url: createUrl({
            database: application.credentials.public.database.name!,
            host: application.credentials.public.database.host!,
            username: application.credentials.public.database.username!,
            password: application.credentials.private.database.password!
        })
    },
    tablesFilter: createTableName("") + "*"
} satisfies Config
