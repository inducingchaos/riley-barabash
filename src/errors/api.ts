/**
 *
 */

import { Error, type ErrorOptions } from "~/meta"

const apiErrors = {
    TRPC_FAILURE: 500,
    INVALID_REQUEST: 400
} as const

type ErrorName = keyof typeof apiErrors

export class APIError extends Error<ErrorName> {
    public status: number

    constructor({ name, message, cause }: ErrorOptions<ErrorName>) {
        super({ name, message, cause })
        this.status = apiErrors[name]
    }
}
