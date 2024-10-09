/**
 *
 */

import { deleteSessions } from "~/server/data/access/shared/auth/sessions/delete"

import { AuthError } from "~/errors"
import { db } from "~/server/data"
import { deleteToken, getAccount, getToken, updateAccount } from "~/server/data/access/shared/auth"
import type { Account } from "~/types/auth"
import { encodePassword } from "~/utils/auth"

export async function changePassword({
    using: { token: tokenValue, password }
}: {
    using: { token: string; password: string }
}): Promise<Account> {
    const token = await getToken({ where: { value: tokenValue }, from: db })
    if (!token)
        throw new AuthError({
            name: "INVALID_CREDENTIALS",
            message: `Token with value '${tokenValue}' not found.`
        })

    return await db.transaction(async tx => {
        await deleteToken({ where: { id: token.id }, in: tx })

        const securePassword = await encodePassword({ using: { password } })

        console.log("securePassword", securePassword)

        const { id: accountId } = (await getAccount({ where: { userId: token.userId, type: "password" }, from: tx }))!
        const account = await updateAccount({ where: { id: accountId }, using: { providerId: securePassword }, in: tx })

        await deleteSessions({
            where: {
                userId: token.userId
            },
            in: tx
        })

        return account
    })
}
