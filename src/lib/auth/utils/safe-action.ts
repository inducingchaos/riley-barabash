/**
 *
 */

import { createServerActionProcedure } from "zsa"
import { assertAuthentication } from "."

export const authenticatedAction = createServerActionProcedure()
    .experimental_shapeError(console.error)
    .handler(async () => {
        const user = await assertAuthentication()

        return { user }
    })

export const unauthenticatedAction = createServerActionProcedure()
    .experimental_shapeError(console.error)
    .handler(async () => {
        return { user: undefined }
    })
