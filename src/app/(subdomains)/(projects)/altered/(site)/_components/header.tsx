/**
 *
 */

import { AlteredLogo } from "~/components/svgs/brand/altered"
import { Button } from "~/components/ui/primitives/inputs"
import Link from "next/link"
import { InlineCode } from "~/components/ui/primitives/typography"
const links = [
    { text: "overview", url: "/#overview" },
    {
        text: "features",
        url: "/#features",
        children: [
            { text: "start", url: "/#start" },
            { text: "ingest", url: "/#ingest" },
            { text: "datasets", url: "/#datasets" },
            { text: "focus", url: "/#focus" },
            { text: "intelligence", url: "/#intelligence" },
            { text: "systems", url: "/#systems" }
        ]
    },
    { text: "use cases", url: "/#use-cases" }
    // { text: "pricing", url: "/pricing" }
] satisfies { text: string; url: string; children?: { text: string; url: string }[] }[]

export function Header(): JSX.Element {
    return (
        <header className="fixed left-0 right-0 top-0 z-10 p-4">
            <div className="flex w-full flex-row items-center justify-between border-2 bg-background/75 backdrop-blur-md">
                {/* Logo. */}
                <div className="flex items-center justify-center gap-3 p-6">
                    <AlteredLogo className="h-6" />
                    <p className="rounded-md border bg-background px-2 py-0.5 font-mono text-xs font-bold">{"preflight"}</p>
                </div>

                {/* Menu bar links. */}

                <nav className="flex flex-row items-center justify-center gap-2">
                    {links.map(item => (
                        <Button key={item.url} asChild variant="link" className="font-mono">
                            <Link href={item.url}>{item.text}</Link>
                        </Button>
                    ))}
                </nav>

                {/* Sign in/out button. */}

                <div className="flex flex-row items-center justify-center p-4">
                    {!"user" ? (
                        <form action="/api/sign-out" method="POST">
                            <Button type="submit" variant="destructive" className="flex h-auto p-0">
                                {"Sign Out"}
                            </Button>
                        </form>
                    ) : (
                        <Button asChild variant="outline" className="rounded-none border-2 font-mono shadow-none">
                            <Link href="/sign-in" className="h-auto">
                                {"join the waitlist"}
                            </Link>
                        </Button>
                    )}
                </div>
            </div>
        </header>
    )
}
