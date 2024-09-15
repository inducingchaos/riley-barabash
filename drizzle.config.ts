/**
 *
 */

import { type Config } from "drizzle-kit"
import { application } from "~/config"
import { createUrl } from "~/utils/db/connection/planetscale"
import { createTableName } from "~/utils/db/schema"

export default {
    schema: ["./src/server/db/schemas/projects/kyzn", "./src/server/db/schemas/projects/riley-barabash"],
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
    tablesFilter: application.shared.settings.flags.database.filterTables === "true" ? createTableName({ from: "*" }) : "*"
} satisfies Config
