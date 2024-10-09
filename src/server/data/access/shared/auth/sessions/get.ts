/**
 *
 */

import { initializeGetDataFunction } from "~/utils/db/access"
import { sessions } from "~/server/data/schemas"

export const getSession = initializeGetDataFunction({ for: sessions, selectMany: false })
export const getSessions = initializeGetDataFunction({ for: sessions, selectMany: true })
