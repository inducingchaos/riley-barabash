/**
 *
 */

import type { SearchParams } from "next/dist/server/request/search-params"
import { PasswordResetForm } from "./_components"

export default async function ResetPassword({ searchParams }: { searchParams: Promise<SearchParams> }): Promise<JSX.Element> {
    const params = await searchParams
    const token = typeof params.token === "string" ? params.token : undefined

    return (
        <main className="flex flex-col items-center justify-center">
            <div className="container">
                <section className="flex h-screen flex-col items-center justify-center">
                    <div className="flex w-96 flex-col justify-center gap-6">
                        <PasswordResetForm token={token} />
                    </div>
                </section>
            </div>
        </main>
    )
}
