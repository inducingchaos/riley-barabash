/**
 * @file The development app configuration.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #config
 * #zod
 * #development
 * #application
 */

import { middleware } from "./middleware"
import { schema, type Config } from "./schema"

export const config = {
    settings: {
        port: 221
    },
    routing: {
        urls: {
            base: undefined
        }
    }
} satisfies Config

export default {
    config,
    middleware,
    schema
}
