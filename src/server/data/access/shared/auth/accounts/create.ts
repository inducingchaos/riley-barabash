/**
 *
 */

import "server-only"

import { Exception } from "~/meta"
import { type Database } from "~/server/data"
import { accounts, type Account, type CreatableAccount, type IdentifiableAccount } from "~/server/data/schemas"
import { buildWhereClause } from "~/utils/db/schema/build-where-clause"
import { getAccount } from "."

export async function createAccount({ using: values, in: db }: { using: CreatableAccount; in: Database }): Promise<Account> {
    return await db.transaction(async tx => {
        const account = await getAccount({
            where: { userId: values.userId, type: values.type } satisfies IdentifiableAccount,
            from: tx
        })
        if (account)
            throw new Exception({
                in: "data",
                for: "duplicate-identifier",
                with: {
                    internal: {
                        label: "Failed to Create Account",
                        message: "An account with the provided values already exists in the database."
                    }
                },
                and: {
                    existing: account,
                    provided: values
                }
            })

        await tx.insert(accounts).values(values)

        return (await tx.query.accounts.findFirst({
            where: buildWhereClause({ with: values, using: accounts })
        }))!
    })
}
