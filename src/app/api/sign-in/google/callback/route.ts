import { cookies } from "next/headers"
import { OAuth2RequestError } from "arctic"
import { googleAuth } from "~/lib/auth"
import { createGoogleUserUseCase } from "~/buse-cases/users"
import { getAccountByGoogleIdUseCase } from "~/buse-cases/accounts"
import { afterLoginUrl } from "~/app-config"
import { setSession } from "~/lib/session"

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
        const tokens = await googleAuth.validateAuthorizationCode(code, codeVerifier)
        const response = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`
            }
        })
        const googleUser = (await response.json()) as GoogleUser

        const existingAccount = await getAccountByGoogleIdUseCase(googleUser.sub)

        if (existingAccount) {
            await setSession(existingAccount.userId)
            return new Response(null, {
                status: 302,
                headers: {
                    Location: afterLoginUrl
                }
            })
        }

        const userId = await createGoogleUserUseCase(googleUser)
        await setSession(userId)
        return new Response(null, {
            status: 302,
            headers: {
                Location: afterLoginUrl
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
