/**
 *
 */

import type { User } from "lucia"
import { validateRequest } from "."

export const getCurrentUser = async (): Promise<User | undefined> => {
    const session = await validateRequest()

    if (!session.user) return undefined
    return session.user
}
