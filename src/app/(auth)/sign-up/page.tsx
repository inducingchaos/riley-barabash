/**
 *
 */

import { H3, Muted } from "~/components/ui/primitives/typography"
import { SignUpForm } from "./_components"
import type { SearchParams } from "next/dist/server/request/search-params"

export default async function SignUp({ searchParams }: { searchParams: Promise<SearchParams> }): Promise<JSX.Element> {
    const params = await searchParams
    const callbackUrl = typeof params["callback-url"] === "string" ? params["callback-url"] : undefined

    return (
        <main className="flex flex-col items-center justify-center">
            <div className="container">
                <section className="flex h-screen flex-col items-center justify-center">
                    <div className="flex w-384px flex-col justify-center gap-24px">
                        <div className="flex flex-col gap-12px text-center">
                            <H3>{"Sign Up"}</H3>

                            <Muted className="px-32px">{"Fill out the details below to create an account."}</Muted>
                        </div>

                        <SignUpForm callbackUrl={callbackUrl} />
                    </div>
                </section>
            </div>
        </main>
    )
}
