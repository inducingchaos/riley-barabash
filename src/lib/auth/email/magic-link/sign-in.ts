/**
 *
 */

import { createAccount, deleteToken, getAccount, getToken, getUser, updateAccount } from "~/server/data/access/shared/auth"
import { db } from "~/server/data"
import { Exception } from "~/meta"
import type { User } from "~/server/data/schemas"

export async function signInWithMagicLink({ using: { token: tokenValue } }: { using: { token: string } }): Promise<User> {
    const token = await getToken({ where: { value: tokenValue }, from: db })
    if (!token)
        throw new Exception({
            in: "auth",
            of: "invalid-credentials",
            with: {
                internal: {
                    label: "Missing Sign-In Token",
                    message: "A sign-in token was not provided."
                }
            }
        })

    if (token.expiresAt < new Date())
        throw new Exception({
            in: "auth",
            of: "expired-token",
            with: {
                internal: {
                    label: "Expired Sign-In Token",
                    message: `'${token.type}' token with value ${token.value} expired at ${token.expiresAt.toISOString()}.`
                }
            }
        })

    const user = (await getUser({ where: { id: token.userId }, from: db }))!
    const account = await getAccount({ where: { userId: token.userId, type: "email" }, from: db })

    if (account) await updateAccount({ where: { id: account.id }, using: { verifiedAt: new Date() }, in: db })
    else await createAccount({ using: { userId: token.userId, type: "email", providerId: user.email }, in: db })

    await deleteToken({ where: { id: token.id }, from: db })

    return user
}
