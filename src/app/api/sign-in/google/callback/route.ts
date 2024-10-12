import { cookies } from "next/headers"
import { OAuth2RequestError } from "arctic"
import { google } from "~/lib/providers/auth"
import type { GoogleUser } from "~/types/auth"
import { createAccount, getAccount, upsertUser } from "~/server/data/access/shared/auth"
import { db } from "~/server/data"
import { setSession } from "~/lib/auth/core"
import { application } from "~/config"

export async function GET(request: Request): Promise<Response> {
    const url = new URL(request.url)
    const code = url.searchParams.get("code")
    const state = url.searchParams.get("state")
    const storedState = cookies().get("google_oauth_state")?.value ?? null
    const codeVerifier = cookies().get("google_code_verifier")?.value ?? null

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
            return new Response(null, {
                status: 302,
                headers: {
                    Location: "/"
                }
            })
        }

        const user = await upsertUser({ where: { email: googleUser.email }, using: { name: googleUser.name, email: googleUser.email }, in: db })
        await createAccount({ using: { userId: user.id, type: "google", providerId: googleUser.sub }, in: db })

        await setSession({ using: { userId: user.id } })
        return new Response(null, {
            status: 302,
            headers: {
                Location: application.routing.paths.callbacks.auth.signIn
            }
        })
    } catch (e) {
        // the specific error message depends on the provider
        if (e instanceof OAuth2RequestError) {
            // invalid code
            return new Response(null, {
                status: 400
            })
        }
        console.log(e)
        return new Response(null, {
            status: 500
        })
    }
}
