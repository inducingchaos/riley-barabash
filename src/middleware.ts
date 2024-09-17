/**
 *
 */

import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest): Promise<NextResponse | undefined> {
    /* For Kyzn. */

    if (request.nextUrl.hostname === "rileybarabash.com" && request.nextUrl.pathname.startsWith("/kyzn"))
        return NextResponse.redirect(
            new URL(`kyzn.app${request.nextUrl.pathname.replace(/^\/kyzn/, "")}${request.nextUrl.search}`, request.url)
        )
    if (request.nextUrl.hostname === "kyzn.rileybarabash.com")
        return NextResponse.redirect(new URL(`kyzn.app${request.nextUrl.pathname}${request.nextUrl.search}`, request.url))
    if (request.nextUrl.hostname.endsWith(".kyzn.app"))
        return NextResponse.redirect(new URL(`kyzn.app${request.nextUrl.pathname}${request.nextUrl.search}`, request.url))

    if (request.nextUrl.hostname === "kyzn.app")
        return NextResponse.rewrite(new URL(`/kyzn${request.nextUrl.pathname}${request.nextUrl.search}`, request.url))

    /* For SolopreneurKit. */

    if (request.nextUrl.hostname === "rileybarabash.com" && request.nextUrl.pathname.startsWith("/solopreneurkit"))
        return NextResponse.redirect(
            new URL(`s--k.it${request.nextUrl.pathname.replace(/^\/solopreneurkit/, "")}${request.nextUrl.search}`, request.url)
        )
    if (request.nextUrl.hostname === "solopreneurkit.rileybarabash.com")
        return NextResponse.redirect(new URL(`s--k.it${request.nextUrl.pathname}${request.nextUrl.search}`, request.url))
    if (request.nextUrl.hostname.endsWith(".s--k.it"))
        return NextResponse.redirect(new URL(`s--k.it${request.nextUrl.pathname}${request.nextUrl.search}`, request.url))

    if (request.nextUrl.hostname === "s--k.it")
        return NextResponse.rewrite(new URL(`/solopreneurkit${request.nextUrl.pathname}${request.nextUrl.search}`, request.url))

    /* For RILEY BARABASH. */

    if (request.nextUrl.hostname.endsWith(".rileybarabash.com"))
        return NextResponse.redirect(
            new URL(`rileybarabash.com${request.nextUrl.pathname}${request.nextUrl.search}`, request.url)
        )

    if (request.nextUrl.hostname === "rileybarabash.com" && request.nextUrl.pathname.startsWith("/links"))
        return NextResponse.redirect(new URL("linktr.ee/rileybarabash", request.url))

    return undefined
}
