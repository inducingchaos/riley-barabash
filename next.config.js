/**
 *
 */

// import { rewrites, redirects } from "./src/constants/routing/index.js"

/**
 * @type { import("next").NextConfig }
 */
export default {
    redirects: async () => {
        return [
            {
                source: "/:path*",
                has: [
                    {
                        type: "host",
                        value: "self-state.com"
                    }
                ],
                destination: "https://rileybarabash.notion.site/Hello-10676f79def580749da9dc2c8fcc0db9?pvs=4",
                permanent: false
            }
        ]
    }
    // rewrites: async () => rewrites
}
