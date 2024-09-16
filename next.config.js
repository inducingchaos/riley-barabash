/**
 *
 */

/**
 * @type { import ( "next" ) .NextConfig }
 */
export default {
    assetPrefix: process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ? "https://rileybarabash.com" : undefined,

    async redirects() {
        return [
            {
                source: "/links",
                destination: "https://linktr.ee/rileybarabash",
                permanent: false
            }
        ]
    },

    async rewrites() {
        return {
            beforeFiles: [
                {
                    source: "/:path*",
                    has: [
                        {
                            type: "host",
                            value: "kyzn.app"
                        }
                    ],
                    destination: "/kyzn/:path*"
                },
                {
                    source: "/:path*",
                    has: [
                        {
                            type: "host",
                            value: "kyzn.rileybarabash.com"
                        }
                    ],
                    destination: "/kyzn/:path*"
                },

                {
                    source: "/:path*",
                    has: [
                        {
                            type: "host",
                            value: "s--k.it"
                        }
                    ],
                    destination: "/solopreneurkit/:path*"
                },
                {
                    source: "/:path*",
                    has: [
                        {
                            type: "host",
                            value: "solopreneurkit.rileybarabash.com"
                        }
                    ],
                    destination: "/solopreneurkit/:path*"
                },

                {
                    source: "/:path*",
                    has: [
                        {
                            type: "host",
                            value: "feed-is-for.horse"
                        }
                    ],
                    destination: "/feed-is-for-horse/:path*"
                },
                {
                    source: "/:path*",
                    has: [
                        {
                            type: "host",
                            value: "feed-is-for-horse.rileybarabash.com"
                        }
                    ],
                    destination: "/feed-is-for-horse/:path*"
                }
            ],
            afterFiles: [],
            fallback: []
        }
    }
}
