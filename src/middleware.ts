/**
 * @todo
 * - [P2] Fix the issue causing all non-recognized subdomains work as the base domain.
 */

import { NextResponse, type NextRequest } from "next/server"

export async function middleware(_request: NextRequest): Promise<NextResponse | undefined> {
    // let response: NextResponse | undefined = undefined

    // response = rewriteSubdomains({
    //     for: request,
    //     config: {
    //         kyzn: ["kyzn.app"],
    //         "feed-is-for-horse": []
    //     }
    // })

    //  Fuck it, just do it manually.

    // if (request.nextUrl.hostname.endsWith("kyzn.app") || request.nextUrl.hostname.endsWith("kyzn.rileybarabash.com")) {
    //     return NextResponse.rewrite(new URL("/kyzn", request.url))
    // }

    // if (request.nextUrl.hostname.endsWith("s--k.it") || request.nextUrl.hostname.endsWith("solopreneurkit.rileybarabash.com")) {
    //     return NextResponse.rewrite(new URL("/solopreneurkit", request.url))
    // }

    // if (
    //     request.nextUrl.hostname.endsWith("feed-is-for.horse") ||
    //     request.nextUrl.hostname.endsWith("feed-is-for-horse.rileybarabash.com")
    // ) {
    //     return NextResponse.rewrite(new URL("/feed-is-for-horse", request.url))
    // }

    return undefined
}

export function rewriteSubdomains({
    for: request,
    config
}: {
    for: NextRequest
    config: Record<string, string[]>
}): NextResponse | undefined {
    //  Get the original domain and the current domain. We can't use the `application` config here because this is run on the Edge.

    const baseUrlHost = process.env.NEXT_PUBLIC_MODE === "development" ? "localhost:221" : "rileybarabash.com"
    const currentUrlHost = request.headers.get("host")!

    //  Extend the rewrite config to include the original domain with the subdomain.

    const rewrites = Object.fromEntries(
        Object.entries(config).map(([key, value]) => [key, [...value, `${key}.${baseUrlHost}`]])
    )

    const matchingSubdomain = Object.keys(rewrites).find(key => rewrites[key]?.includes(currentUrlHost))

    //  If a matching subdomain is found, rewrite the URL.

    if (matchingSubdomain) {
        const path = request.nextUrl.pathname

        //  Avoid re-writing the `_next` and `api` directories to resource errors.

        if (!path.startsWith("/_next") && !path.startsWith("/api")) {
            const targetUrl = new URL(
                `${request.nextUrl.protocol}//${baseUrlHost}/${matchingSubdomain}${path}${request.nextUrl.search}`
            )

            return NextResponse.rewrite(targetUrl)
        }
    }

    return undefined
}
