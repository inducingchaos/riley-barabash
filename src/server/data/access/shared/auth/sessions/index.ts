/**
 *
 */

import { initializeCreateDataFunction, initializeGetDataFunction } from "~/utils/db/access"
import { prohibitedSessionColumns, sessionIndexes, sessions } from "~/server/data/schemas"

export const getSession = initializeGetDataFunction({ for: sessions, selectMany: false })
export const getSessions = initializeGetDataFunction({ for: sessions, selectMany: true })

export const createSession = initializeCreateDataFunction({
    for: sessions,
    with: {
        columns: {
            prohibited: prohibitedSessionColumns
        },
        indexes: sessionIndexes
    }
})
