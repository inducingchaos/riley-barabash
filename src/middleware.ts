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
    const session = await validateRequest()

    if (session.user && request.nextUrl.pathname.startsWith("/sign-in")) {
        return NextResponse.redirect(new URL("/", request.url))
    }

    return undefined
}
