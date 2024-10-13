/**
 *
 */

import { NextResponse, type NextRequest } from "next/server"
import { application } from "~/config"
import { composeResponse } from "~/lib/comms/sms/compose-response"
import { decodeParams, type DecodeParamsResult } from "~/lib/comms/sms/decode-params"

export async function POST(req: NextRequest): Promise<NextResponse> {
    //  Decode the request

    // Check if the request is made to the base URL
    // const headersList = headers()
    // const host = headersList.get("host")
    // const baseUrl = `${req.nextUrl.protocol}//${host}`

    if (req.url?.startsWith(application.routing.urls.base ?? "")) {
        // Forward the request to a placeholder URL
        const url = `${process.env.NEXT_PUBLIC_DEVTUNNEL_URL}/api/comms/sms`
        const forwardedResponse = await fetch(url, {
            method: req.method,
            headers: req.headers,
            body: req.body
        })

        return NextResponse.json(await forwardedResponse.json(), {
            status: forwardedResponse.status,
            headers: forwardedResponse.headers
        })
    }

    const messageParams: DecodeParamsResult = await decodeParams({ req })

    //  Process the message params and produce a response

    // const response: string | null = await coordinateResponse(messageParams)

    //  Generate a response and send it back to Twilio

    return composeResponse({ content: `Hi ${req.url}! ${messageParams.Body}` })
}
