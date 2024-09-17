/**
 *
 */

import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest): Promise<NextResponse | undefined> {
    /* For Kyzn. */

    // if (request.nextUrl.hostname.endsWith(".kyzn.app"))
    //     return NextResponse.redirect(new URL(`kyzn.app${request.nextUrl.pathname}${request.nextUrl.search}`, request.url))

    /* For SolopreneurKit. */

    // if (request.nextUrl.hostname.endsWith(".s--k.it"))
    //     return NextResponse.redirect(new URL(`s--k.it${request.nextUrl.pathname}${request.nextUrl.search}`, request.url))

    /* For RILEY BARABASH. */

    // if (request.nextUrl.hostname.endsWith(".rileybarabash.com"))
    //     return NextResponse.redirect(
    //         new URL(`rileybarabash.com${request.nextUrl.pathname}${request.nextUrl.search}`, request.url)
    //     )

    const redirectsResponse = redirect({
        for: request,
        config: [
            {
                from: ["rileybarabash.com/kyzn*"],
                to: "kyzn.app"
            },
            {
                from: ["rileybarabash.com/solopreneurkit*", "solopreneurkit.rileybarabash.com*"],
                to: "s--k.it"
            },
            {
                from: ["rileybarabash.com/links"],
                to: "linktr.ee/rileybarabash"
            }
        ]
    })

    if (redirectsResponse) return redirectsResponse

    const domainRewritesResponse = rewriteDomainsToPath({
        for: request,
        config: [
            {
                from: ["kyzn.app", "kyzn.rileybarabash.com"],
                to: "/kyzn"
            },
            {
                from: ["s--k.it"],
                to: "/solopreneurkit"
            }
        ]
    })

    if (domainRewritesResponse) return domainRewritesResponse

    return undefined
}

export function redirect({
    for: request,
    config: redirects
}: {
    for: NextRequest
    config: { from: string | string[]; to: string }[]
}): NextResponse | undefined {
    for (const redirect of redirects) {
        const { from, to: destination } = redirect
        const sources = typeof from === "string" ? [from] : from

        //  Matches based on the domain and the path.

        let matchingSource = sources.find(source =>
            source.endsWith("*")
                ? `${request.nextUrl.hostname}${request.nextUrl.pathname}`.startsWith(source.slice(0, -1))
                : `${request.nextUrl.hostname}${request.nextUrl.pathname}` === source
        )

        //  Remove the trailing wildcard if it exists.

        matchingSource = matchingSource?.endsWith("*") ? matchingSource.slice(0, -1) : matchingSource

        console.log("MATCHING SOURCE", matchingSource, "TO", `${request.nextUrl.hostname}${request.nextUrl.pathname}`)

        if (matchingSource) {
            const sourceUrl = new URL(`https://${matchingSource}`, request.url)

            //  If the source URL has a path, remove it from the request URL pathname.

            const path = sourceUrl.pathname
                ? request.nextUrl.pathname.replace(sourceUrl.pathname, "")
                : request.nextUrl.pathname

            console.log("SOURCE URL PATH", sourceUrl.pathname, "REQUEST URL PATH", request.nextUrl.pathname, "NEW PATH", path)

            console.log(
                "REDIRECT",
                new URL(`${request.nextUrl.protocol}//${destination}${path}${request.nextUrl.search}`, request.url).toString()
            )

            return NextResponse.redirect(
                new URL(`${request.nextUrl.protocol}//${destination}${path}${request.nextUrl.search}`, request.url)
            )
        }
    }

    return undefined
}

export function rewriteDomainsToPath({
    for: request,
    config: rewrites
}: {
    for: NextRequest
    config: { from: string | string[]; to: string }[]
}): NextResponse | undefined {
    if (request.nextUrl.pathname.startsWith("/_next") || request.nextUrl.pathname.startsWith("/api")) return undefined

    for (const rewrite of rewrites) {
        const { from, to: path } = rewrite
        const domains = typeof from === "string" ? [from] : from

        if (domains.includes(request.nextUrl.hostname))
            return NextResponse.rewrite(new URL(`${path}${request.nextUrl.pathname}${request.nextUrl.search}`, request.url))
    }

    return undefined
}
