/**
 *
 */

import "server-only"

import { eq } from "drizzle-orm"
import type { Database } from "~/server/data"
import { users, type CreatableUser, type User } from "~/server/data/schemas"
import { Exception } from "~/meta"
import { getUser } from "."

export async function createUser({ using: values, in: db }: { using: CreatableUser; in: Database }): Promise<User> {
    return await db.transaction(async tx => {
        const user = await getUser({ where: values, from: tx })
        if (user)
            throw new Exception({
                in: "data",
                of: "duplicate-identifier",
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
