/**
 *
 */

import { Exception } from "~/meta"
import { type Database } from "~/server/data"
import { accounts, type Account, type QueryableAccount, type UpdatableAccount } from "~/server/data/schemas"
import { buildWhereClause } from "~/utils/db/schema/build-where-clause"
import { getAccount } from "."

export async function updateAccount({
    where: query,
    using: values,
    in: db
}: {
    where: QueryableAccount
    using: UpdatableAccount
    in: Database
}): Promise<Account> {
    return await db.transaction(async tx => {
        const account = await getAccount({ where: query, from: tx })
        if (!account)
            throw new Exception({
                in: "data",
                for: "resource-not-found",
                with: {
                    internal: {
                        label: "Failed to Update Account",
                        message: "The query for the account to update did not return any results."
                    }
                },
                and: {
                    query,
                    values
                }
            })

        await tx
            .update(accounts)
            .set(values)
            .where(buildWhereClause({ with: query, using: accounts }))
        return (await tx.query.accounts.findFirst({ where: buildWhereClause({ with: values, using: accounts }) }))!
    })
}
