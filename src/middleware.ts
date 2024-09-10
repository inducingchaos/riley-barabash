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
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isProtectedRoute = createRouteMatcher(["/internal(.*)"])

export default clerkMiddleware((auth, request: NextRequest): NextResponse | undefined => {
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

// export function middleware(_request: NextRequest): NextResponse | undefined {
//     return undefined
// }
