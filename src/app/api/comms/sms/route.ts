/**
 *
 */

import { NextResponse, type NextRequest } from "next/server"
import { composeResponse } from "~/lib/comms/sms/compose-response"
import { decodeParams, type DecodeParamsResult } from "~/lib/comms/sms/decode-params"

export async function POST(req: NextRequest): Promise<NextResponse> {
    const requestUrl = new URL(req.url)
    const isForwarded = req.headers.get("Content-Type") === "application/json"
    const messageParams = isForwarded ? ((await req.json()) as DecodeParamsResult) : await decodeParams({ req })

    if (
        requestUrl.hostname.endsWith("rileybarabash.com") ||
        (requestUrl.hostname.endsWith("value-only.com") &&
            messageParams.Body.toLowerCase().startsWith("/dev") &&
            messageParams.From.endsWith("0221"))
    ) {
        const response = await fetch("https://39nkpp9k-221.usw2.devtunnels.ms" + requestUrl.pathname, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(messageParams)
        })

        return new NextResponse(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers
        })
    }

    // const response: string | null = await coordinateResponse(messageParams)

    return composeResponse({
        content: `${requestUrl.port ? "[dev] " : ""}Received: ${messageParams.Body} YO so I can make live changes now?`
    })
}
