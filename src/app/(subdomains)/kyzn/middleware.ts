import { type NextRequest, type NextResponse } from "next/server"

export async function middleware(_request: NextRequest): Promise<NextResponse | undefined> {
    return undefined
}

//
