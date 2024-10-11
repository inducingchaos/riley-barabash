/**
 *
 */

import "server-only"

import { eq } from "drizzle-orm"
import type { Database } from "~/server/data"
import { users } from "~/server/data/schemas"
import type { User } from "~/types/auth"
import { Exception } from "~/meta"

export async function createUser({
    using: values,
    in: db
}: {
    using: Omit<User, "id" | "createdAt" | "updatedAt">
    in: Database
}): Promise<User> {
    return await db.transaction(async tx => {
        const user = await tx.query.users.findFirst({ where: eq(users.email, values.email) })
        if (user)
            throw new Exception({
                in: "data",
                for: "duplicate-identifier",
                with: {
                    internal: {
                        label: "Failed to Create User",
                        message: "A user with conflicting values already exists in the database."
                    }
                },
                and: {
                    existing: user,
                    provided: values
                }
            })

        const { id } = (await tx.insert(users).values(values).$returningId())[0]!

        return (await tx.query.users.findFirst({
            where: eq(users.id, id)
        }))!
    })
}
