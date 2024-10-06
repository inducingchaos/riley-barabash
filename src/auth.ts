import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { db } from "~/server/db"

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "mysql",
        usePlural: true
    }),
    emailAndPassword: {
        enabled: true
    },
    logger: {
        disabled: false,
        verboseLogging: true
    }
})
