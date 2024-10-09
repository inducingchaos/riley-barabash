/**
 *
 */

import { initializeGetDataFunction } from "~/utils/db/access"
import { accounts } from "~/server/data/schemas"

export const getAccount = initializeGetDataFunction({ for: accounts, selectMany: false })
export const getAccounts = initializeGetDataFunction({ for: accounts, selectMany: true })
