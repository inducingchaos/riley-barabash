/**
 *
 */

import "server-only"

import { eq } from "drizzle-orm"
import { DataError } from "~/errors"
import { type Database } from "~/server/data"
import { accounts } from "~/server/data/schemas"
import type { Account, AccountOptions } from "~/types/auth"
import { getAccount } from "."

export async function createAccount({ using: values, in: db }: { using: AccountOptions; in: Database }): Promise<Account> {
    return await db.transaction(async tx => {
        const account = await getAccount({ where: { userId: values.userId, type: values.type }, from: tx })
        if (account)
            throw new DataError({
                name: "RESOURCE_ALREADY_EXISTS",
                message: `Account with type '${values.type}' already exists for user ${values.userId}.`
            })

        await tx.insert(accounts).values(values)

        return (await tx.query.accounts.findFirst({
            where: eq(accounts.userId, values.userId)
        }))!
    })
}
