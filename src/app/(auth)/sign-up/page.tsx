/**
 *
 */

import { H3, Muted } from "~/components/ui/primitives/typography"
import { SignUpForm } from "./_components"

export default function SignUp({ searchParams }: { searchParams: Record<string, string | string[]> }): JSX.Element {
    const callbackUrl = typeof searchParams["callback-url"] === "string" ? searchParams["callback-url"] : undefined

    return (
        <main className="flex flex-col items-center justify-center">
            <div className="container">
                <section className="flex h-screen flex-col items-center justify-center">
                    <div className="flex w-96 flex-col justify-center gap-6">
                        <div className="flex flex-col gap-3 text-center">
                            <H3>{"Sign Up"}</H3>

                            <Muted className="px-8">{"Fill out the details below to create an account."}</Muted>
                        </div>

                        <SignUpForm callbackUrl={callbackUrl} />
                    </div>
                </section>
            </div>
        </main>
    )
}
