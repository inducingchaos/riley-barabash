/**
 * @file A base class to use for defining custom errors.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #meta
 * #error
 */

export interface ErrorOptions<ErrorName> {
    /**
     * The name of the error.
     */
    name: ErrorName

    /**
     * A detailed description of the error.
     */
    message: string

    /**
     * Additional data related to the error.
     */
    cause?: unknown
}

/**
 * A custom error class base. Useful for constructing custom application errors.
 */
class CustomError<ErrorName extends string> extends Error {
    /**
     * The name of the error.
     */
    name: ErrorName

    /**
     * A detailed description of the error.
     */
    message: string

    /**
     * Additional data related to the error.
     */
    cause: unknown

    constructor({ name, message, cause }: ErrorOptions<ErrorName>) {
        super()
        this.name = name
        this.message = message
        this.cause = cause
    }
}

export { CustomError as Error }
