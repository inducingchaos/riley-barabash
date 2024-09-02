/**
 * @file The production app configuration.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #config
 * #zod
 * #production
 * #schema
 * #application
 */

import { middleware } from "./middleware"
import { schema, type Config } from "./schema"

export const config = {} satisfies Config

export default {
    config,
    middleware,
    schema
}
