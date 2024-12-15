/**
 *
 */

import { application } from "~/config"
import { SignInForm } from "./_components"
import { H3, InlineCode, Muted } from "~/components/ui/primitives/typography"
import Link from "next/link"
import { Button } from "~/components/ui/primitives/inputs"
import type { SearchParams } from "next/dist/server/request/search-params"

export default async function SignIn({ searchParams }: { searchParams: Promise<SearchParams> }): Promise<JSX.Element> {
    const params = await searchParams
    const callbackUrl = typeof params["callback-url"] === "string" ? params["callback-url"] : undefined

    return (
        <main className="flex flex-col items-center justify-center">
            <div className="container">
                <section className="flex h-screen flex-col items-center justify-center">
                    <div className="flex w-96 flex-col justify-center gap-6">
                        <div className="flex flex-col gap-3 text-center">
                            <H3>{"Sign In"}</H3>

                            <Muted className="px-8">
                                {"Sign in below to access your account. If this is your first time, you can "}

                                <Link
                                    href={application.routing.paths.pages.auth.signUp}
                                    className="hover:text-accent-constant underline underline-offset-4"
                                >
                                    {"create one here."}
                                </Link>
                            </Muted>
                        </div>

                        <SignInForm callbackUrl={callbackUrl} />

                        {callbackUrl && (
                            <div className="mt-4 text-center">
                                <p className="text-main-half text-14">Callback URL:</p>
                                <InlineCode>{callbackUrl}</InlineCode>
                            </div>
                        )}

                        <Button asChild style="link">
                            <Link href="/reset-password">Forgot Password?</Link>
                        </Button>
                    </div>
                </section>
            </div>
        </main>
    )
}
