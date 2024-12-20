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
        <div className="fixed inset-y-0px left-0px flex h-full flex-col items-center justify-center p-16px">
            <header className="flex h-auto w-256px flex-col items-start justify-between gap-24px rounded-12px bg-alternate/half p-24px shadow-[0_0_96px_rgba(0,0,0,0.09375)] backdrop-blur dark:border dark:border-main/sixteenth dark:shadow-none">
                <div className="flex flex-col items-start gap-16px">
                    <div className="relative size-96px">
                        <Image
                            src="/riley-barabash/brand/pfp.jpg"
                            alt="Profile Picture"
                            fill
                            className="rounded-12px object-cover"
                        />
                    </div>
                    <div className="flex flex-col items-start">
                        <h1 className="text-24px font-bold">Riley Barabash</h1>
                        <p className="text-14px text-main/half dark:text-main/half">Full-Stack Developer</p>
                    </div>
                </div>

                <nav className="flex w-full flex-col items-start gap-8px">
                    {navItems.map(item => (
                        <Button key={item.href} asChild style="link" className="h-auto p-0px">
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
