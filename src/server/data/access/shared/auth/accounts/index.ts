/**
 *
 */

import { accountIndexes, accounts, prohibitedAccountColumns } from "~/server/data/schemas"
import { initializeCreateDataFunction, initializeGetDataFunction } from "~/utils/db/access"

export const getAccount = initializeGetDataFunction({ for: accounts, selectMany: false })
export const getAccounts = initializeGetDataFunction({ for: accounts, selectMany: true })

export const createAccount = initializeCreateDataFunction({
    for: accounts,
    with: {
        columns: {
            prohibited: prohibitedAccountColumns
        },
        indexes: accountIndexes
    }
})

export * from "./update"
