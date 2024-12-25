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
import { AnimatedSections } from "./_components"

export default async function Landing(): Promise<JSX.Element> {
    //  do sum

    // const user = await getCurrentUser()
    // if (user) redirect("/dashboard")
    // redirect("/sign-in")

    return (
        <>
            <main className="flex flex-col items-center justify-center">
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
                            <Button style="fill" color="danger" intensity="reduced" asChild className="font-mono">
                                <Link href="/iiinput">{"iiinput"}</Link>
                            </Button>
                        </div>
                    </div>
                </section>
                <AnimatedSections />

                <Separator className="bg-accent-neutral" />
            </main>
        </>
    )
}
