/**
 *
 */

import { middleware } from "./middleware"
import { schema, type Config } from "./schema"

export const config = {} satisfies Config

export default {
    config,
    middleware,
    schema
}
