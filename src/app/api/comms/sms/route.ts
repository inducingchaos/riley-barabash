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
        requestUrl.hostname.endsWith("rileybarabash.com") &&
        messageParams.Body.toLowerCase().startsWith("/dev") &&
        messageParams.From.endsWith("0221")
    )
        return NextResponse.rewrite(new URL(requestUrl.pathname, "https://39nkpp9k-221.usw2.devtunnels.ms"))

    // const response: string | null = await coordinateResponse(messageParams)

    return composeResponse({ content: `${requestUrl.port ? "[dev] " : ""}Received: ${messageParams.Body}` })
}
