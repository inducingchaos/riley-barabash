/**
 * @remarks
 * - This route is mostly used for testing and development purposes, and it may be removed in the future.
 */

import { NextResponse, type NextRequest } from "next/server"
import { Exception } from "~/meta"

export async function GET(request: NextRequest): Promise<NextResponse> {
    const requestId: string | null = request.nextUrl.searchParams.get("id")

    if (!requestId) {
        new Exception({
            in: "network",
            of: "bad-request",
            with: {
                internal: {
                    label: "Missing Request ID",
                    message: "An infra request ID was not provided."
                }
            }
        })
    }

    switch (requestId) {
        case "test-request":
            return NextResponse.json({ message: "test-response" })

        default:
            return Exception.toNetworkResponse({
                using: new Exception({
                    in: "network",
                    of: "bad-request",
                    with: {
                        internal: {
                            label: "Invalid Request ID",
                            message: "The infra request ID provided is invalid."
                        }
                    },
                    and: {
                        id: requestId
                    }
                })
            })
    }
}
