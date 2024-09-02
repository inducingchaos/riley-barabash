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
                        {/* Content. */}

                        <Button disabled={isSending} onClick={() => sendMessage({ content: "Yolo, dude!", to: personal.contact.phone })}>
                            {isSending ? "YAHHH BUDDY!!!" : "Yolo, dude!"}
                        </Button>
                    </section>
                </div>
            </main>
        </>
    )
}
