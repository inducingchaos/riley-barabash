/**
 * @file The configuration for Next.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #next
 * #config
 * #build
 */

/**
 * @type { import ( "next" ) .NextConfig }
 */
export default {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "*.googleusercontent.com",
                port: "",
                pathname: "**"
            }
        ]
    }
}
