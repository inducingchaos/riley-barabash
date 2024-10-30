/**
 *
 */

import type { NextConfig } from "next"

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
} satisfies NextConfig
