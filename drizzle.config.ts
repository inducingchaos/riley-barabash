/**
 *
 */

import { type Config } from "drizzle-kit"
import { application } from "~/config"
import { createUrl } from "~/utils/db/connection/planetscale"
import { createTableName } from "~/utils/db/schema"

export default {
    schema: [
        "./src/server/data/schemas/kyzn",
        "./src/server/data/schemas/riley-barabash",
        "./src/server/data/schemas/shared",
        "./src/server/data/schemas/iiinput"
    ],
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

// import { config } from "dotenv"
// import { defineConfig } from "drizzle-kit"

// config({
//     path: ".env.local"
// })

// export default defineConfig({
//     schema: "./src/domains/ai-chat/lib/db/schema.ts",
//     out: "./src/domains/ai-chat/lib/db/migrations",
//     dialect: "postgresql",
//     dbCredentials: {
//         // biome-ignore lint: Forbidden non-null assertion.
//         url: process.env.POSTGRES_URL!
//     }
// })
