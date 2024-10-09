/**
 *
 */

import { eq } from "drizzle-orm"
import { DataError } from "~/errors"
import { type Database } from "~/server/data"
import { accounts } from "~/server/data/schemas"
import type { Account, AccountOptions } from "~/types/auth"
import { getAccount } from "."

export async function updateAccount({
    where: query,
    using: values,
    in: db
}: {
    where: Partial<Account>
    using: Partial<AccountOptions>
    in: Database
}): Promise<Account> {
    return await db.transaction(async tx => {
        const account = await getAccount({ where: query, from: tx })
        if (!account)
            throw new DataError({
                name: "RESOURCE_NOT_FOUND",
                message: "The account could not be found.",
                cause: {
                    query
                }
            })

        await tx.update(accounts).set(values).where(eq(accounts.id, account.id))
        return (await tx.query.accounts.findFirst({ where: eq(accounts.id, account.id) }))!
    })
}
