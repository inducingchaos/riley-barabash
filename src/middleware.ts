/**
 * @file Middleware for Next.js routes.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #middleware
 * #next
 */

import { type NextResponse, type NextRequest } from "next/server"

export function middleware(_request: NextRequest): NextResponse | undefined {
    return undefined
}
