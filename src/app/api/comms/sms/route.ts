/**
 *
 */

import { NextResponse, type NextRequest } from "next/server"
import { composeResponse } from "~/lib/comms/sms/compose-response"
import { decodeParams, type DecodeParamsResult } from "~/lib/comms/sms/decode-params"

export async function POST(req: NextRequest): Promise<NextResponse> {
    const requestUrl = new URL(req.url)
    const messageParams: DecodeParamsResult = await decodeParams({ req })

    if (
        requestUrl.hostname.endsWith("rileybarabash.com") ||
        (requestUrl.hostname.endsWith("value-only.com") &&
            messageParams.Body.toLowerCase().startsWith("/dev") &&
            messageParams.From.endsWith("0221"))
    ) {
        const clonedReq = req.clone()

        const response = await fetch("https://39nkpp9k-221.usw2.devtunnels.ms" + requestUrl.pathname, {
            method: clonedReq.method,
            headers: clonedReq.headers,
            body: clonedReq.body
        })

        return new NextResponse(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers
        })
    }

    // const response: string | null = await coordinateResponse(messageParams)

    return composeResponse({ content: `${requestUrl.port ? "[dev] " : ""}Received: ${messageParams.Body}` })
}
