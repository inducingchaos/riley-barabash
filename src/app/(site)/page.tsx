/**
 *
 */

// import { getCurrentUser } from "~/lib/session"
// import { redirect } from "next/navigation"
import { Separator } from "@radix-ui/react-separator"
import Image from "next/image"
import Link from "next/link"
import { Button } from "~/components/ui/primitives/inputs"
import { H1, InlineCode, Muted } from "~/components/ui/primitives/typography"

export default async function Landing(): Promise<JSX.Element> {
    //  do sum

    // const user = await getCurrentUser()
    // if (user) redirect("/dashboard")
    // redirect("/sign-in")

    return (
        <>
            <main className="flex flex-col items-center justify-center">
                <div className="container">
                    <section className="flex min-h-screen flex-col items-center justify-center">
                        <div className="flex flex-col items-center justify-center gap-6">
                            <div className="relative h-24 w-24">
                                <Image
                                    src="/entities/riley-barabash/brand/pfp.jpg"
                                    alt="Profile Picture"
                                    fill
                                    className="rounded-xl object-cover"
                                />
                            </div>
                            <H1>{"My name is Riley."}</H1>
                            <InlineCode>{"X/IG: @inducingchaos"}</InlineCode>
                            <Muted>{"Check out my projects:"}</Muted>
                            <div className="flex flex-row gap-2">
                                <Button variant="outline" asChild>
                                    <Link href="/value-only">{"Value-Only"}</Link>
                                </Button>
                            </div>
                        </div>
                    </section>

                    <Separator className="my-8" />

                    <section className="flex min-h-screen flex-col items-center justify-center">
                        <p>{"You should only see this if you're signed in."}</p>
                    </section>
                </div>
            </main>
        </>
    )
}
