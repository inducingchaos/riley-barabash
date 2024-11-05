/**
 *
 */

import { createServerActionProcedure } from "zsa"
import { Exception } from "~/meta"
import { assertAuthentication } from "."

export const authenticatedAction = createServerActionProcedure()
    .experimental_shapeError(async ({ err: error }) => {
        if (error instanceof Exception) return error.serialize()
        else throw error
    })
    .handler(async () => {
        const user = await assertAuthentication()

        return { user }
    })

export const unauthenticatedAction = createServerActionProcedure()
    .experimental_shapeError(async ({ err: error }) => {
        if (error instanceof Exception) return error.serialize()
        else throw error
    })
    .handler(async () => {
        return { user: undefined }
    })
