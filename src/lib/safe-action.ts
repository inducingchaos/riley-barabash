import { assertAuthenticated } from "~/lib/session"
import { createServerActionProcedure } from "zsa"
import { PublicError } from "../use-cases/errors"

function shapeErrors({ err }: { err: unknown }) {
    // let's all errors pass through to the UI so debugging locally is easier
    const isDev = process.env.NODE_ENV === "development"
    if (err instanceof PublicError || isDev) {
        console.error(err)
        return {
            code: (err as PublicError).name ?? "ERROR",
            message: `${isDev ? "DEV ONLY ENABLED - " : ""}${(err as PublicError).message}`
        }
    } else {
        return {
            code: "ERROR",
            message: "Something went wrong"
        }
    }
}

export const authenticatedAction = createServerActionProcedure()
    .experimental_shapeError(shapeErrors)
    .handler(async () => {
        const user = await assertAuthenticated()
        return { user }
    })

export const unauthenticatedAction = createServerActionProcedure()
    .experimental_shapeError(shapeErrors)
    .handler(async () => {
        return { user: undefined }
    })
