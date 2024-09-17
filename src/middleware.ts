/**
 *
 */

import { type NextRequest, type NextResponse } from "next/server"
import { redirectUrls, rewriteDomainsToPath } from "~/lib/infra/middleware/helpers"

export async function middleware(request: NextRequest): Promise<NextResponse | undefined> {
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
            }
        ]
    })

    if (rewriteDomainsToPathResponse) return rewriteDomainsToPathResponse

    return undefined
}
