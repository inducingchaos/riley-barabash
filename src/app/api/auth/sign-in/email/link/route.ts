/**
 *
 */

import { setSession } from "~/lib/auth/utils"
import { signInWithMagicLink } from "~/lib/auth/email/magic-link/sign-in"
import { Exception } from "~/meta"

export const dynamic = "force-dynamic"

export async function GET(request: Request): Promise<Response> {
    try {
        const url = new URL(request.url)
        const token = url.searchParams.get("token")

        if (!token) {
            return Exception.toNetworkResponse({
                using: new Exception({
                    in: "network",
                    of: "bad-request",
                    with: {
                        internal: {
                            label: "Missing Sign-In Token",
                            message: "A sign-in token was not provided."
                        }
                    }
                })
            })
        }

        const user = await signInWithMagicLink({ using: { token } })

        await setSession({ using: { userId: user.id } })

        return new Response(null, {
            status: 302,
            headers: {
                Location: "/"
            }
        })
    } catch (err) {
        console.error(err)
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/sign-in/magic/error"
            }
        })
    }
}
