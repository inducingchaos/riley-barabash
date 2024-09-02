/**
 * @file The middleware for the brand config.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #config
 * #brand
 * #middleware
 */

import type { Config } from "./schema"

export function middleware(brand: Config): Config {
    return brand
}