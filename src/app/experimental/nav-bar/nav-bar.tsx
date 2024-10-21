/**
 *
 */

import Image from "next/image"
import Link from "next/link"
import { type IconType } from "react-icons"
import { FiHome, FiFolder, FiBriefcase, FiMail } from "react-icons/fi"
import { Button } from "~/components/ui/primitives/inputs"

const navItems: { href: string; icon: IconType; label: string }[] = [
    { href: "/", icon: FiHome, label: "Home" },
    { href: "/projects", icon: FiFolder, label: "Projects" },
    { href: "/experience", icon: FiBriefcase, label: "Experience" },
    { href: "/contact", icon: FiMail, label: "Contact" }
]

export function Bar(): JSX.Element {
    return (
        <div className="fixed bottom-0 left-0 top-0 flex h-full flex-col items-center justify-center p-4">
            <header className="rounded-xl bg-background/[0.5] dark:border-foreground/[0.0625] flex h-auto w-64 flex-col items-start justify-between gap-6 p-6 shadow-[0_0_96px_rgba(0,0,0,0.09375)] backdrop-blur dark:border dark:shadow-none">
                <div className="flex flex-col items-start gap-4">
                    <div className="relative h-24 w-24">
                        <Image
                            src="/riley-barabash/brand/pfp.jpg"
                            alt="Profile Picture"
                            fill
                            className="rounded-xl object-cover"
                        />
                    </div>
                    <div className="flex flex-col items-start">
                        <h1 className="text-24 font-bold">Riley Barabash</h1>
                        <p className="text-foreground/[0.5] dark:text-foreground/[0.5] text-14">Full-Stack Developer</p>
                    </div>
                </div>

                <nav className="flex w-full flex-col items-start gap-2">
                    {navItems.map(item => (
                        <Button key={item.href} asChild style="link" className="h-auto p-0">
                            <Link href={item.href}>{item.label}</Link>
                        </Button>
                    ))}
                </nav>

                <Button asChild>
                    <Link href={true ? "/sign-in" : "/sign-out"}>{true ? "Sign In" : "Sign Out"}</Link>
                </Button>
            </header>
        </div>
    )
}
