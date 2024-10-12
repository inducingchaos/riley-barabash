/**
 *
 */

import { Exception } from "~/meta"
import { db } from "~/server/data"
import { deleteToken, getToken, updateAccount } from "~/server/data/access/shared/auth"

export async function verifyEmail({ using: { token: tokenValue } }: { using: { token: string } }) {
    return await db.transaction(async tx => {
        const token = await getToken({ where: { value: tokenValue, type: "email-verification" }, from: tx })

        if (!token)
            throw new Exception({
                in: "auth",
                of: "invalid-credentials",
                with: {
                    internal: {
                        label: "Cannot Verify Email",
                        message: "The provided token does not exist."
                    },
                    external: {
                        label: "Unable to Verify Email",
                        message: "The token you provided is invalid."
                    }
                }
            })

        await updateAccount({ where: { userId: token.userId, type: "email" }, using: { verifiedAt: new Date() }, in: tx })
        await deleteToken({ where: { value: tokenValue, type: "email-verification" }, from: tx })
        return token.userId
    })
}
