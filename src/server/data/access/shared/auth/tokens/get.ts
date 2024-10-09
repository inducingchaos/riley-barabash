/**
 *
 */

import { initializeGetDataFunction } from "~/utils/db/access"
import { tokens } from "~/server/data/schemas"

export const getToken = initializeGetDataFunction({ for: tokens, selectMany: false })
export const getTokens = initializeGetDataFunction({ for: tokens, selectMany: true })
