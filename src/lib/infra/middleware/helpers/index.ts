/**
 *
 */

import { NextResponse, type NextRequest } from "next/server"

/**
 * Designed to redirect a set of URLs (hostnames + paths, no trailing slashes, allows leading and trailing wildcards) to a single destination (needs to include the hostname at minimum).
 *
 * @remarks This function was designed for a specific use case only, and should be reviewed/refactored before being used in another project.
 */
export function redirectUrls({
    for: request,
    config: redirects
}: {
    for: NextRequest
    config: { from: string | string[]; to: string }[]
}): NextResponse | undefined {
    for (const redirect of redirects) {
        const { from, to: destination } = redirect
        const sources = typeof from === "string" ? [from] : from

        //  Matches based on the hostname + path of the source URL and the request URL, accommodating for leading and trailing wildcards.

        const matchingSource = sources
            .find(source => {
                const pattern = `^${source.replace(/\*/g, ".*")}$`
                return new RegExp(pattern).test(
                    `${request.nextUrl.hostname}${request.nextUrl.pathname === "/" ? "" : request.nextUrl.pathname}`
                )
            })
            ?.replace("*", "")

        if (matchingSource) {
            const sourcePath = matchingSource.includes("/") ? `/${matchingSource.split("/").slice(1).join("/")}` : ""

            //  If the source URL has a path, remove it from the request URL pathname.

            const path = sourcePath ? request.nextUrl.pathname.replace(sourcePath, "") : request.nextUrl.pathname

            return NextResponse.redirect(
                new URL(`${request.nextUrl.protocol}//${destination}${path}${request.nextUrl.search}`, request.url)
            )
        }
    }

    return undefined
}

/**
 * Designed to rewrite a set of hostnames to a single-segment path.
 *
 * @remarks This function was designed for a specific use case only, and should be reviewed/refactored before being used in another project.
 */
export function rewriteDomainsToPath({
    for: request,
    config: rewrites
}: {
    for: NextRequest
    config: { from: string | string[]; to: string }[]
}): NextResponse | undefined {
    //  If the pathname is a Next.js internal path, do not rewrite.

    if (request.nextUrl.pathname.startsWith("/_next") || request.nextUrl.pathname.startsWith("/api")) return undefined

    for (const rewrite of rewrites) {
        const { from, to: path } = rewrite
        const hostnames = typeof from === "string" ? [from] : from

        if (hostnames.includes(request.nextUrl.hostname))
            return NextResponse.rewrite(new URL(`${path}${request.nextUrl.pathname}${request.nextUrl.search}`, request.url))
    }

    return undefined
}
