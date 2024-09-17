/**
 *
 */

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { Button } from "~/components/ui/primitives/inputs"

const links = [
    { label: "Entities", url: "/entities" },
    { label: "Content", url: "/content" }
] satisfies { label: string; url: string }[]

export function Bar(): JSX.Element {
    return (
        <header className="fixed left-0 right-0 top-0 z-10 flex w-full flex-row items-center justify-between bg-background">
            {/* Logo. */}

            <h1 className="text-nowrap px-6 py-4 text-2xl font-bold tracking-tighter">{"RILEY BARABASH"}</h1>

            {/* Menu bar links. */}

            <nav className="flex flex-row items-center justify-center gap-2">
                {links.map(item => (
                    <Button key={item.url} asChild variant="link" className="h-auto p-0">
                        <Link href={item.url}>{item.label}</Link>
                    </Button>
                ))}
            </nav>

            {/* Sign in/out button. */}

            <div className="flex flex-row items-center justify-center px-4 py-4">
                <Button variant="default">
                    <>
                        <SignedOut>
                            <SignInButton />
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </>
                </Button>
            </div>
        </header>
    )
}
