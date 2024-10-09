/**
 *
 */

import "server-only"

import { eq } from "drizzle-orm"
import { type Database } from "~/server/data"
import { users } from "~/server/data/schemas"
import type { User, UserID } from "~/types/auth"

export async function updateUser({
    with: id,
    using: values,
    in: db
}: {
    with: UserID
    using: Omit<Partial<User>, "id" | "createdAt" | "updatedAt">
    in: Database
}): Promise<User> {
    return await db.transaction(async tx => {
        if (!(await tx.query.users.findFirst({ where: eq(users.id, id) }))) throw new Error("User doesn't exist")

        await tx.update(users).set(values).where(eq(users.id, id))

        return (await tx.query.users.findFirst({ where: eq(users.id, id) }))!
    })
}
