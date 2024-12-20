/**
 *
 */

// import { getCurrentUser } from "~/lib/session"
// import { redirect } from "next/navigation"
import { Separator } from "@radix-ui/react-separator"
import Image from "next/image"
import Link from "next/link"
import { Button } from "~/components/ui/primitives/inputs"
import { InlineCode, Muted } from "~/components/ui/primitives/typography"
import Test from "./_components/test"

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
                        <div className="flex flex-col items-center justify-center gap-24px">
                            <div className="relative size-96px">
                                <Image
                                    src="/riley-barabash/profile-picture.jpg"
                                    alt="Profile Picture"
                                    fill
                                    className="border border-main object-cover"
                                />
                            </div>
                            <h1 className="text-48px font-semibold tracking-tight">{"My name is Riley."}</h1>
                            <InlineCode>{"X/IG: @inducingchaos"}</InlineCode>
                            <Muted>{"Check out my projects:"}</Muted>
                            <div className="flex flex-row gap-8px">
                                {/* <Button style="outline" asChild>
                                    <Link href="/value-only">{"Value-Only"}</Link>
                                </Button> */}

                                <Button style="outline" asChild className="font-mono">
                                    <Link href="/altered">{"Altered"}</Link>
                                </Button>
                            </div>
                        </div>
                    </section>
                    <Test />

                    <Separator className="my-32px" />

                    <section className="flex min-h-screen flex-col items-center justify-center">
                        <p>{"You should only see this if you're signed in."}</p>
                    </section>
                </div>
            </main>
        </>
    )
}
