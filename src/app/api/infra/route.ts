/**
 * @file Handles miscellaneous infrastructure requests.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #app
 * #api
 * #route
 * #infra
 * #server
 *
 * @remarks
 * - This route is mostly used for testing and development purposes, and it may be removed in the future.
 */

import { NextResponse, type NextRequest } from "next/server"
import { APIError } from "~/errors"
import { createResponse } from "~/utils/api/errors"

export async function GET(request: NextRequest): Promise<NextResponse> {
    const requestId: string | null = request.nextUrl.searchParams.get("id")

    if (!requestId) {
        return createResponse(
            new APIError({
                name: "INVALID_REQUEST",
                message: "Missing infrastructure request ID."
            })
        )
    }

    switch (requestId) {
        case "test-request":
            return NextResponse.json({ message: "test-response" })

        default:
            return createResponse(
                new APIError({
                    name: "INVALID_REQUEST",
                    message: `The request ID '${requestId}' is not a valid identifier.`
                })
            )
    }
}
