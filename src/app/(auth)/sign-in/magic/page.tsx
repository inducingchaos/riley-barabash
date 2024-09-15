import { redirect } from "next/navigation"
import { getCurrentUser } from "~/lib/session"
import { pageTitleStyles } from "~/styles/common"

export default async function MagicLinkPage() {
    const user = await getCurrentUser()
    if (user) redirect("/dashboard")

    return (
        <div className="mx-auto max-w-[400px] space-y-6 py-24">
            <h1 className={pageTitleStyles}>Check your email</h1>
            <p className="text-xl">We sent you a magic link to sign in. Click the link in your email to sign in.</p>
        </div>
    )
}
