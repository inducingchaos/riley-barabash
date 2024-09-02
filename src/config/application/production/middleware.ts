/**
 * @file Middleware for the production app configuration.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #config
 * #zod
 * #middleware
 * #application
 * #production
 */

import type { Config } from "./schema"

export function middleware(application: Config): Config {
    return application
}
