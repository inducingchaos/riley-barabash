/**
 *
 */

/**
 * @type { import("next").NextConfig }
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
