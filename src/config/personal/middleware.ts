/**
 * @file The middleware for the personal config.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #config
 * #personal
 * #middleware
 */

import type { Config } from "./schema"

export function middleware(personal: Config): Config {
    if (!personal.info.age) personal.info.age = new Date().getFullYear() - new Date(personal.info.birthdate).getFullYear()

    return personal
}
