/**
 *
 */

import "server-only"

import type { Database } from "~/server/data"
import type { User, UserOptions } from "~/types/auth"
import { createUser, getUser, updateUser } from "."

export async function upsertUser({
    where: query,
    using: values,
    in: db
}: {
    where: Partial<User>
    using: Omit<UserOptions, "id" | "createdAt" | "updatedAt">
    in: Database
}): Promise<User> {
    return await db.transaction(async tx => {
        const user = await getUser({ where: query, from: tx })

        if (user) return await updateUser({ with: user.id, using: values, in: tx })
        else return await createUser({ using: values, in: tx })
    })
}
