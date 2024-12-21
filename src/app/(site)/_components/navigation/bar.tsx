/**
 *
 */

import Link from "next/link"
import { ThemeToggle } from "~/components/ui/compositions/design"
import { Button } from "~/components/ui/primitives/inputs"
import { getCurrentUser } from "~/lib/auth/utils"

const links = [
    { label: "Entities", url: "/entities" },
    { label: "Content", url: "/content" }
] satisfies { label: string; url: string }[]

export async function Bar(): Promise<JSX.Element> {
    const user = await getCurrentUser()

    return (
        <header className="fixed inset-x-0px top-0px z-10 flex w-full flex-row items-center justify-between bg-alternate p-8px">
            {/* Logo. */}

            <h1 className="text-nowrap px-24px py-16px text-24px font-bold tracking-tighter">{"RILEY BARABASH"}</h1>

            {/* Menu bar links. */}

            <nav className="flex flex-row items-center justify-center gap-8px">
                {links.map(item => (
                    <Button key={item.url} asChild style="link" className="h-auto p-0px">
                        <Link href={item.url}>{item.label}</Link>
                    </Button>
                ))}
            </nav>

            {/* Sign in/out button. */}

            <div className="flex flex-row items-center justify-center gap-8px px-16px">
                <div className="flex flex-row items-center justify-center">
                    {user ? (
                        <form action="/api/sign-out" method="POST">
                            <Button type="submit" style="ghost" className="flex h-auto p-0px">
                                {"Sign Out"}
                            </Button>
                        </form>
                    ) : (
                        <Button asChild>
                            <Link href="/sign-in">Sign In</Link>
                        </Button>
                    )}
                </div>
                <ThemeToggle />
            </div>
        </header>
    )
}
