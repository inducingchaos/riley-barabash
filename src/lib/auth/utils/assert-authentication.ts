/**
 *
 */

import "server-only"

import { getCurrentUser } from "."
import { Exception } from "~/meta"

export const assertAuthentication = async () => {
    const user = await getCurrentUser()
    if (!user)
        throw new Exception({
            in: "auth",
            of: "unauthenticated",
            with: {
                internal: {
                    label: "Unauthenticated",
                    message: "The current user is not authenticated."
                }
            }
        })

    return user
}
