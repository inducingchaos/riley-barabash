/**
 * @file Middleware for Next.js routes.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #middleware
 * #next
 */

import { NextResponse, type NextRequest } from "next/server"
import { validateRequest } from "./lib/auth"

export async function middleware(request: NextRequest): Promise<NextResponse | undefined> {
    let response: NextResponse | undefined

    /* Rewrites. */

    // const projectSubdomains = ["kyzn", "sortify"]
    // const projectDomains = {
    //     kyzn: "kyzn.app",
    //     // null or undefined means that the project is on the root domain.
    //     sortify: undefined
    // }

    // const allProjectSubdomains = projectSubdomains.map(subdomain => {
    //     return `${subdomain}.${projectDomains[subdomain]}`
    // })

    // if (allProjectSubdomains.includes(getDomain({ for: request })!)) {
    //     //
    // }

    const session = await validateRequest()

    if (session.user && request.nextUrl.pathname.startsWith("/sign-in")) {
        return NextResponse.redirect(new URL("/", request.url))
    }

    // const kyznMiddlewareResponse = await kyznMiddleware(request)

    // if (kyznMiddlewareResponse) {
    //     return kyznMiddlewareResponse
    // }

    return response
}

// const getDomain = ({ for: request }: { for: NextRequest }) => request.headers.get("host")
// const getPath = ({ for: request }: { for: NextRequest }) => request.nextUrl.pathname

// const currentDomain = ({ for: request, is: domain }: { for: NextRequest; is: string }) =>
//     getDomain({ for: request })?.endsWith(domain)
// const currentSubdomain = ({ for: request, is: subdomain }: { for: NextRequest; is: string }) =>
//     getDomain({ for: request })?.startsWith(subdomain + ".")

// export async function kyznMiddleware(request: NextRequest): Promise<NextResponse | undefined> {
//     let response: NextResponse | undefined

//     const isKyznDomain = currentDomain({ for: request, is: "kyzn.app" })
//     const isKzSubdomainOnRbDomain =
//         currentSubdomain({ for: request, is: "kyzn" }) && currentDomain({ for: request, is: "rileybarabash.com" })

//     if (isKyznDomain || isKzSubdomainOnRbDomain) {
//         const path = getPath({ for: request })

//         const newUrl = new URL(`rileybarabash.com/kyzn/${path}`)
//         newUrl.search = request.nextUrl.search

//         response = NextResponse.rewrite(newUrl)
//     }

//     return response
// }
