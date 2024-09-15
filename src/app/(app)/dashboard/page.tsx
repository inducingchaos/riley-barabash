import { getCurrentUser } from "~/lib/session"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
    console.log("-----Getting current user on dashboard-----")
    const user = await getCurrentUser()
    console.log("-----Current user on dashboard-----", user)
    if (!user) redirect("/sign-in")

    return (
        <div>
            <h1>Dashboard</h1>

            <p>put your dashboard stuff here</p>
        </div>
    )
}
