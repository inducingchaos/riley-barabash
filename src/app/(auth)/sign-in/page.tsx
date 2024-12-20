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
                    <div className="flex w-384px flex-col justify-center gap-24px">
                        <div className="flex flex-col gap-12px text-center">
                            <H3>{"Sign In"}</H3>

                            <Muted className="px-32px">
                                {"Sign in below to access your account. If this is your first time, you can "}

                                <Link
                                    href={application.routing.paths.pages.auth.signUp}
                                    className="underline underline-offset-4 hover:text-accent-constant"
                                >
                                    {"create one here."}
                                </Link>
                            </Muted>
                        </div>

                        <SignInForm callbackUrl={callbackUrl} />

                        {callbackUrl && (
                            <div className="mt-16px text-center">
                                <p className="text-14px text-main/half">Callback URL:</p>
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
