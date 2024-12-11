/**
 *
 */

import { type NextRequest, NextResponse } from "next/server"
import { redirectUrls, rewriteDomainsToPath } from "~/lib/infra/middleware/helpers"
import { validateRequest } from "~/lib/auth/utils"

export const config = {
    unstable_allowDynamic: ["**/node_modules/lodash*/**/*.js"]
}

export async function middleware(request: NextRequest): Promise<NextResponse> {
    /* Session extension. */

    if (request.method === "GET") {
        const response = NextResponse.next()
        const token = request.cookies.get("session")?.value ?? null
        if (token !== null) {
            // Only extend cookie expiration on GET requests since we can be sure
            // a new session wasn't set when handling the request.
            response.cookies.set("session", token, {
                path: "/",
                maxAge: 60 * 60 * 24 * 30,
                sameSite: "lax",
                httpOnly: true,
                secure: process.env.NODE_ENV === "production"
            })
        }
        return response
    }

    /* CSRF protection. */

    if (request.method === "GET") {
        return NextResponse.next()
    }
    const originHeader = request.headers.get("Origin")
    // NOTE: You may need to use `X-Forwarded-Host` instead
    const hostHeader = request.headers.get("Host")
    if (originHeader === null || hostHeader === null) {
        return new NextResponse(null, {
            status: 403
        })
    }
    let origin: URL
    try {
        origin = new URL(originHeader)
    } catch {
        return new NextResponse(null, {
            status: 403
        })
    }
    if (origin.host !== hostHeader) {
        return new NextResponse(null, {
            status: 403
        })
    }

    /* Routing. */

    const redirectUrlsResponse: NextResponse | undefined = redirectUrls({
        for: request,
        config: [
            {
                from: ["rileybarabash.com/kyzn*", "*.kyzn.app*"],
                to: "kyzn.app"
            },
            {
                from: ["rileybarabash.com/altered*", "*.altered.app*"],
                to: "altered.app"
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
                from: ["altered.app", "altered.rileybarabash.com"],
                to: "/altered"
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

    return NextResponse.next()
}

/*

import NextAuth from 'next-auth';

import { authConfig } from '~/app/experimental/ai-chat/(auth)/auth.config';

export default NextAuth(authConfig).auth;

export const config = {
  matcher: ['/', '/:id', '/api/:path*', '/login', '/register'],
};

// For AI Chat

*/
