/**
 *
 */

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse, type NextRequest } from "next/server"
import { redirectUrls, rewriteDomainsToPath } from "~/lib/infra/middleware/helpers"

const isProtectedRoute = createRouteMatcher(["/internal(.*)"])

export default clerkMiddleware((auth, request: NextRequest): NextResponse | undefined => {
    /* Routing. */

    const redirectUrlsResponse: NextResponse | undefined = redirectUrls({
        for: request,
        config: [
            {
                from: ["rileybarabash.com/kyzn*", "*.kyzn.app*"],
                to: "kyzn.app"
            },
            {
                from: ["rileybarabash.com/solopreneurkit*", "solopreneurkit.rileybarabash.com*", "*.s--k.it*"],
                to: "s--k.it"
            },
            {
                from: [
                    "rileybarabash.com/my-future-self*",
                    "my-future-self.rileybarabash.com*",
                    "*.myfutureself.app*",
                    "myfutureself.app*",
                    "rileybarabash.com/your-future-self*",
                    "your-future-self.rileybarabash.com*",
                    "*.yourfutureself.app*"
                ],
                to: "yourfutureself.app"
            },

            {
                from: ["rileybarabash.com/links"],
                to: "linktr.ee/rileybarabash"
            },
            {
                from: ["*.rileybarabash.com*"],
                to: "rileybarabash.com"
            }
        ]
    })

    if (redirectUrlsResponse) return redirectUrlsResponse

    const rewriteDomainsToPathResponse: NextResponse | undefined = rewriteDomainsToPath({
        for: request,
        config: [
            {
                from: ["kyzn.app", "kyzn.rileybarabash.com"],
                to: "/kyzn"
            },
            {
                from: "s--k.it",
                to: "/solopreneurkit"
            },
            {
                from: "yourfutureself.app",
                to: "/your-future-self"
            }
        ]
    })

    if (rewriteDomainsToPathResponse) return rewriteDomainsToPathResponse

    /* Authentication. */

    if (!auth().userId && isProtectedRoute(request)) return NextResponse.redirect(new URL("/unauthenticated", request.url))
})

export const config = {
    matcher: [
        //  Skip Next.js internals and all static files, unless found in search params.

        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",

        //  Always run for API routes.

        "/(api|trpc)(.*)"
    ]
}
