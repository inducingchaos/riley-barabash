/**
 *
 */

import "server-only"

import { getCurrentUser } from "."
import { AuthError } from "~/errors"

export const assertAuthentication = async () => {
    const user = await getCurrentUser()
    if (!user)
        throw new AuthError({
            name: "UNAUTHENTICATED",
            message: "The current user is not authenticated."
        })

    return user
}
