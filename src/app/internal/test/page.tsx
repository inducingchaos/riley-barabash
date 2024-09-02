/**
 * @file A page for testing UI.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #app
 * #internal
 * #experimental
 * #test
 * #page
 * #tsx
 */

"use client"

import Link from "next/link"
import { ThemeToggle } from "~/components/ui/compositions"
import { Button } from "~/components/ui/primitives"
import { personal } from "~/config"
import { api } from "~/lib/infra/rpc/react"

export default function Test(): JSX.Element {
    const { mutate: sendMessage, isPending: isSending } = api.comms.sms.messages.send.useMutation()

    return (
        <>
            {/* Main tag. */}

            <main className="flex flex-col items-center justify-center">
                {/* Container. */}

                <div className="container">
                    {/* Section one. */}

                    <section className="flex min-h-screen flex-col items-center justify-center">
                        {/* Wrapper. */}

                        <div className="flex flex-col items-center justify-center gap-4">
                            {/* Change the theme. */}

                            <ThemeToggle />

                            {/* If you wanna holla at my SMS (don't spam pls). */}

                            <Button disabled={isSending} onClick={() => sendMessage({ content: "Yolo, dude!", to: personal.contact.phone })}>
                                {isSending ? "YAHHH BUDDY!!!" : "Yolo, dude!"}
                            </Button>

                            {/* Go back. */}

                            <Button variant="outline" asChild>
                                <Link href="/">{"Go back"}</Link>
                            </Button>
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}
