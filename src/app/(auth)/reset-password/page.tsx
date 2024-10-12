/**
 *
 */

import { PasswordResetForm } from "./_components"

export default function ResetPassword({ searchParams }: { searchParams: Record<string, string | string[]> }): JSX.Element {
    const token = typeof searchParams.token === "string" ? searchParams.token : undefined

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
