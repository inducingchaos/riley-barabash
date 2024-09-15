/**
 *
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
