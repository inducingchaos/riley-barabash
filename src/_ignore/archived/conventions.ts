/**
 * @file Describes the contents of the file.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #organization
 * #conventions
 * #documentation
 *
 * @todo
 * - [P0] Signifies a critical priority with extensive impact that requires immediate attention.
 * - [P1] Signifies a high priority with a large potential impact and requires an urgent response.
 * - [P2] Signifies a moderate priority with a moderate impact. Important, but needs to be prioritized against other issues.
 * - [P3] Signifies a low priority with a minor impact. This is not urgent and should be done as part of routine work.
 * - [P4] Signifies a negligible priority with little to no impact. Should be placed on the backlog.
 *
 * @remarks
 * - References (`@see`) can be written inline for single items or on separate lines for a list of items. Tags (`@tags`), tasks (`@todo`), and notes (`@remarks`) should always be written as a list.
 * - Every page should have a description (`@file`), author (`@author`), and tags (`@tags`). Barrel files without additional content don't need tags.
 * - Multi-line TSDoc comments should start on the line after the tag. Inline comments should start on the same line as the tag.
 * - We always expand TSDoc to be multi-line for consistency, and omit the `@description` tag for readability.
 * - When adding tags, think of keywords/topics relevant to the contents, and also include tags for the full folder path to the file. This will come in handy if we ever implement a tag-based file structure and search feature.
 *
 * @see [PlanetScale Documentation](https://planetscale.com/docs)
 */

/**
 * Create an interface for a function parameter set if there is a possibility for reuse.
 *
 * We use types to avoid the unnecessary unpredictability of inheritance with interfaces, unless explicitly needed.
 *
 * Actually I changed my mind, Matt Pocock: interfaces do sound cooler.
 *
 * Aim to use the 'params' naming convention for functions where all parameters are required, 'options' when most of the parameters are optional, and the 'props' convention for React function components. We're trying to be contextual here.
 *
 * @example
 * //  An example of how the params object is used. Not required for internal definitions.
 * interface exampleParams {
 *
 *     firstName: 'John',
 *     lastName: 'Doe',
 *     age: 18
 *
 * }
 */
type ExampleParams = {
    /**
     * The description of the parameter.
     */
    firstName: string

    /**
     * The description of an optional parameter.
     */
    lastName?: string
}

/**
 * A description of the function.
 *
 * @param {string | null} [greeting="hello"] A description of the parameter. Wrap in square brackets if the parameter is optional. Use a an equals sign to specify a default value. Not required for internal definitions.
 * @param {ExampleParams} params A description of the params object.
 * @returns {string} A description of the return value. Not required for internal definitions.
 * @throws {Error} A description of the thrown error. Not required for internal definitions.
 *
 * @example
 * //  An example of how the function is used. Not required for internal definitions.
 *
 * const message: string = example("Hello", { firstName: "John" })
 * console.log(message)
 */
function example(greeting: string | null | undefined = "hello", { firstName }: ExampleParams): string {
    //  Throw an error if no greeting is provided.

    if (!greeting) throw new Error("A greeting is required.")

    //  Return a greeting with the provided name.

    return `${greeting}, ${firstName}!`
}

/* USE CAPITALIZED MULTI-LINE COMMENTS TO SECTION CODE */

//  Use single-line comments to describe implementation details that are not obvious in nature. Make sure to use two spaces after the `//` to align your comment indentation with the code. Place a line break before and after the comment for readability.

console.log(example(undefined, { firstName: "John" })) /* Use multiple-line comments to describe code in-line. */
