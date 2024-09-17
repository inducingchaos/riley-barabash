/**
 *
 */

/**
 * @type { import("next/dist/lib/load-custom-routes").Rewrite[] }
 */
export const rewrites = [
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
                value: "s--k.it"
            }
        ],
        destination: "/solopreneurkit/:path*"
    }
]
