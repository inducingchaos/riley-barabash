/**
 *
 */

import { application } from "~/config"
import { verifyEmail } from "~/lib/auth/email/verify"

export const dynamic = "force-dynamic"

export async function GET(request: Request): Promise<Response> {
    try {
        const url = new URL(request.url)
        const token = url.searchParams.get("token")

        if (!token) {
            return new Response(null, {
                status: 302,
                headers: {
                    Location: "/sign-in"
                }
            })
        }

        await verifyEmail({ using: { token } })

        return new Response(null, {
            status: 302,
            headers: {
                Location: `${application.routing.paths.callbacks.auth.verification.email}?success=true`
            }
        })
    } catch (err) {
        console.error(err)
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/sign-in"
            }
        })
    }
}
