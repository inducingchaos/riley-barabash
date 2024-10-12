/**
 *
 */

import { DrizzleMySQLAdapter } from "@lucia-auth/adapter-drizzle"
import { Lucia } from "lucia"
import { db } from "~/server/data"
import { sessions, users, type UserID } from "~/server/data/schemas"

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
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Register {
        Lucia: typeof lucia

        DatabaseUserAttributes: {
            id: UserID
        }

        UserId: UserID
    }
}
