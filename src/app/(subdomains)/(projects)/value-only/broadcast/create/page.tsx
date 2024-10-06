/**
 *
 */

import { H1 } from "~/components/ui/primitives/typography"
import { BroadcastForm } from "./_components"

// monolith app accounts are created as a generic user with an array of apps, wihcih is an array of a global prjects enum. Then auth would be isAuthenticated({app: "solopreneurkit"})

export default async function CreateBroadcast(): Promise<JSX.Element> {
    return (
        <>
            <main className="flex flex-col items-center justify-center">
                <div className="container">
                    <section className="flex min-h-screen flex-col items-center justify-center gap-16 py-64">
                        <H1>Create a broadcast.</H1>

                        <p>Broadcasts are messages that are distributed as posts on various platforms.</p>

                        <BroadcastForm />
                    </section>
                </div>
            </main>
        </>
    )
}
