/**
 * @file Middleware for the preview app configuration.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #config
 * #zod
 * #middleware
 * #application
 * #preview
 */

import type { Config } from "./schema"

export function middleware(application: Config): Config {
    return application
}
