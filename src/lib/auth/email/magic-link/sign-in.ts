/**
 *
 */

import { createAccount, deleteToken, getAccount, getToken, getUser, updateAccount } from "~/server/data/access/shared/auth"
import { AuthError } from "~/errors"
import { db } from "~/server/data"
import type { User } from "~/types/auth"

export async function signInWithMagicLink({ using: { token: tokenValue } }: { using: { token: string } }): Promise<User> {
    const token = await getToken({ by: "value", using: tokenValue, from: db })
    if (!token)
        throw new AuthError({
            name: "RESOURCE_NOT_FOUND",
            message: `Authentication token with value ${tokenValue} was not found in the database.`
        })

    if (token.expiresAt < new Date())
        throw new AuthError({
            name: "TOKEN_EXPIRED",
            message: `'${token.type}' token with value ${token.value} expired at ${token.expiresAt.toISOString()}.`
        })

    const user = (await getUser({ by: "id", using: token.userId, from: db }))!
    const account = await getAccount({ for: token.userId, by: "type", using: "email", from: db })

    if (account) await updateAccount({ for: account.id, using: { verifiedAt: new Date() }, in: db })
    else await createAccount({ for: token.userId, using: { type: "email", providerId: user.email }, in: db })

    await deleteToken({ for: token.id, from: db })

    return user
}
