/**
 *
 */

import { getUser } from "~/server/data/access/shared/auth"
import { AuthError } from "~/errors"
import { db } from "~/server/data"
import { verifyPassword } from "."
import type { User } from "~/types/auth"

export async function signInWithPassword({
    using: { email, password }
}: {
    using: {
        email: string
        password: string
    }
}): Promise<User> {
    const user = await getUser({ where: { email }, from: db })
    if (!user)
        throw new AuthError({
            name: "INVALID_CREDENTIALS",
            message: `User with email '${email}' not found.`
        })

    const validCredentials: boolean = await verifyPassword({ using: { email, password } })

    if (!validCredentials)
        throw new AuthError({
            name: "INVALID_CREDENTIALS",
            message: `Incorrect password provided for user with email '${email}'.`
        })

    return user
}
