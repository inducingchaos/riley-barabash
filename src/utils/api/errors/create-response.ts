/**
 *
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
