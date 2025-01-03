/**
 *
 */

import { cookies } from "next/headers"
import { OAuth2RequestError } from "arctic"
import { google } from "~/lib/providers/auth"
import type { GoogleUser } from "~/types/auth"
import { createAccount, getAccount, upsertUser } from "~/server/data/access/shared/auth"
import { db } from "~/server/data"
import { setSession } from "~/lib/auth/utils"
import { application } from "~/config"
import { NextResponse } from "next/server"

export async function GET(request: Request): Promise<Response> {
    const cookieStore = await cookies()

    const url = new URL(request.url)
    const code = url.searchParams.get("code")
    const state = url.searchParams.get("state")
    const storedState = cookieStore.get("google_oauth_state")?.value ?? null
    const codeVerifier = cookieStore.get("google_code_verifier")?.value ?? null

    if (!code || !state || !storedState || state !== storedState || !codeVerifier) {
        return new Response(null, {
            status: 400
        })
    }

    try {
        const tokens = await google.validateAuthorizationCode(code, codeVerifier)
        const response = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`
            }
        })
        const googleUser = (await response.json()) as GoogleUser

        const existingAccount = await getAccount({ where: { providerId: googleUser.sub, type: "google" }, from: db })

        if (existingAccount) {
            await setSession({ using: { userId: existingAccount.userId } })
            return NextResponse.redirect(application.routing.paths.callbacks.auth.signIn, { status: 303 })
        }

        const user = await upsertUser({
            where: { email: googleUser.email },
            using: { name: googleUser.name, email: googleUser.email },
            in: db
        })
        await createAccount({ using: { userId: user.id, type: "google", providerId: googleUser.sub }, in: db })

        await setSession({ using: { userId: user.id } })
        return NextResponse.redirect(application.routing.paths.callbacks.auth.signIn, { status: 303 })
    } catch (e) {
        // the specific error message depends on the provider
        if (e instanceof OAuth2RequestError) {
            // invalid code
            return NextResponse.redirect(application.routing.paths.callbacks.auth.signIn, { status: 400 })
        }
        console.log(e)
        return NextResponse.redirect(application.routing.paths.callbacks.auth.signIn, { status: 500 })
    }
}
