/**
 * @file Creates a response for an API error.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #utils
 * #api
 * #errors
 * #create-response
 */

import { NextResponse } from "next/server"
import type { APIError } from "~/errors"

export function createResponse(error: APIError): NextResponse {
    return NextResponse.json(
        {
            error: {
                code: error.name,
                message: error.message,
                details: error.cause
            }
        },
        { status: error.status }
    )
}
