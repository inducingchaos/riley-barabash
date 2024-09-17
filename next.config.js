/**
 *
 */

import { rewrites, redirects } from "./src/constants/routing/index.js"

/**
 * @type { import("next").NextConfig }
 */
export default {
    redirects: async () => redirects,
    rewrites: async () => rewrites
}
