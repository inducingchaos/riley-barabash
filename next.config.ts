/**
 *
 */

import type { NextConfig } from "next"

export default {
    images: {
        // minimumCacheTTL: 31536000,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "*.googleusercontent.com",
                port: "",
                pathname: "**"
            }
        ]
    }
    // experimental: {
    //     ppr: true
    // },
    // typescript: {
    //     ignoreBuildErrors: true
    // },
    // eslint: {
    //     ignoreDuringBuilds: true
    // }
} satisfies NextConfig
