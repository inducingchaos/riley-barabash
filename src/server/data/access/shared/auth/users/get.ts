/**
 *
 */

import { initializeGetDataFunction } from "~/utils/db/access"
import { users } from "~/server/data/schemas"

export const getUser = initializeGetDataFunction({ for: users, selectMany: false })
export const getUsers = initializeGetDataFunction({ for: users, selectMany: true })
