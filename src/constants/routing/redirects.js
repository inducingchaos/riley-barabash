/**
 *
 */

/**
 * @type { import("next/dist/lib/load-custom-routes").Redirect[] }
 */
export const redirects = [
    //  For RILEY BARABASH.

    {
        source: "/:path*",
        has: [{ type: "host", value: ".*\\.rileybarabash.com" }],
        destination: "https://rileybarabash.com/:path*",
        permanent: true
    },
    {
        source: "/links",
        has: [{ type: "host", value: "rileybarabash.com" }],
        destination: "https://linktr.ee/rileybarabash",
        permanent: false
    },

    //  For Kyzn.

    {
        source: "/kyzn/:path*",
        has: [{ type: "host", value: "rileybarabash.com" }],
        destination: "https://kyzn.app/:path*",
        permanent: true
    },
    {
        source: "/:path*",
        has: [{ type: "host", value: "kyzn.rileybarabash.com" }],
        destination: "https://kyzn.app/:path*",
        permanent: true
    },
    {
        source: "/:path*",
        has: [{ type: "host", value: ".*\\.kyzn.app" }],
        destination: "https://kyzn.app/:path*",
        permanent: true
    },

    //  For SolopreneurKit.

    {
        source: "/solopreneurkit/:path*",
        has: [{ type: "host", value: "rileybarabash.com" }],
        destination: "https://s--k.it/:path*",
        permanent: true
    },
    {
        source: "/:path*",
        has: [{ type: "host", value: "solopreneurkit.rileybarabash.com" }],
        destination: "https://s--k.it/:path*",
        permanent: true
    },
    {
        source: "/:path*",
        has: [{ type: "host", value: ".*\\.s--k.it" }],
        destination: "https://s--k.it/:path*",
        permanent: true
    }
]
