/**
 *
 */

import type { NextConfig } from "next"

export default {
    experimental: {
        ppr: true
        // dynamicIO: true
    },

    images: {
        // minimumCacheTTL: 31536000,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "*.googleusercontent.com",
                port: "",
                pathname: "**"
            },
            {
                hostname: "avatar.vercel.sh"
            }
        ]
    },

    typescript: {
        ignoreBuildErrors: true
    },
    eslint: {
        ignoreDuringBuilds: true
    }
} satisfies NextConfig
