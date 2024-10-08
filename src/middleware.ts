/**
 *
 */

import { type NextRequest, NextResponse } from "next/server"
import { redirectUrls, rewriteDomainsToPath } from "~/lib/infra/middleware/helpers"
import { validateRequest } from "~/lib/auth/core"

export async function middleware(request: NextRequest): Promise<NextResponse | undefined> {
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
                from: ["rileybarabash.com/value-only*", "value-only.rileybarabash.com*", "*.value-only.com*"],
                to: "value-only.com"
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
            },
            {
                from: "value-only.com",
                to: "/value-only"
            }
        ]
    })

    if (rewriteDomainsToPathResponse) return rewriteDomainsToPathResponse

    /* Auth. */

    const session = await validateRequest()

    // // Get the auth session and redirect to the callback URL if the user is authenticated.

    if (session.user && request.nextUrl.pathname.startsWith("/sign-in")) {
        return NextResponse.redirect(new URL("/", request.url))
    }
}
