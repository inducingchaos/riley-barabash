/**
 *
 */

import { DrizzleMySQLAdapter } from "@lucia-auth/adapter-drizzle"
import { Lucia } from "lucia"
import { db } from "~/server/data"
import { sessions, users } from "~/server/data/schemas"
import type { UserID } from "~/types/auth"

const adapter = new DrizzleMySQLAdapter(db, sessions, users)

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        expires: false,

        attributes: {
            secure: process.env.ENVIRONMENT === "production"
        }
    },

    getUserAttributes: attributes => {
        return {
            id: attributes.id
        }
    }
})

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia

        DatabaseUserAttributes: {
            id: UserID
        }

        UserId: UserID
    }
}
