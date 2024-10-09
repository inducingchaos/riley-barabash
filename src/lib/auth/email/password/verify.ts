/**
 *
 */

import { db } from "~/server/data"
import { getAccount, getUser } from "~/server/data/access/shared/auth"
import { comparePassword } from "~/utils/auth"

export async function verifyPassword({
    using: { email, password }
}: {
    using: {
        email: string
        password: string
    }
}): Promise<boolean> {
    return await db.transaction(async tx => {
        const user = await getUser({ where: { email }, from: tx })
        if (!user) return false

        const account = await getAccount({ where: { userId: user.id, type: "password" }, from: tx })
        if (!account) return false

        return await comparePassword({ using: { plain: password, secure: account.providerId } })
    })
}
