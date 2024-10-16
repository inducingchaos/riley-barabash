import { google } from "~/lib/providers/auth"
import { cookies } from "next/headers"
import { generateCodeVerifier, generateState } from "arctic"
import { NextResponse } from "next/server"

export async function GET(): Promise<NextResponse> {
    const state = generateState()
    const codeVerifier = generateCodeVerifier()
    const url = await google.createAuthorizationURL(state, codeVerifier, {
        scopes: ["profile", "email", "openid"]
    })

    cookies().set("google_oauth_state", state, {
        secure: process.env.ENVIRONMENT === "production",
        path: "/",
        httpOnly: true,
        maxAge: 60 * 10,
        sameSite: "lax"
    })

    cookies().set("google_code_verifier", codeVerifier, {
        secure: process.env.ENVIRONMENT === "production",
        path: "/",
        httpOnly: true,
        maxAge: 60 * 10,
        sameSite: "lax"
    })

    return NextResponse.redirect(url)
}
