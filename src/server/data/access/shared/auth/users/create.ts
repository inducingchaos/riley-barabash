/**
 *
 */

import "server-only"

import { eq } from "drizzle-orm"
import type { Database } from "~/server/data"
import { users } from "~/server/data/schemas"
import type { User } from "~/types/auth"

export async function createUser({
    using: values,
    in: db
}: {
    using: Omit<User, "id" | "createdAt" | "updatedAt">
    in: Database
}): Promise<User> {
    return await db.transaction(async tx => {
        if (await tx.query.users.findFirst({ where: eq(users.email, values.email) })) throw new Error("User already exists")

        const { id } = (await tx.insert(users).values(values).$returningId())[0]!

        return (await tx.query.users.findFirst({
            where: eq(users.id, id)
        }))!
    })
}
