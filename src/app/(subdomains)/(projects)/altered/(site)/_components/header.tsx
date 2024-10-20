/**
 *
 */

import Link from "next/link"
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react"
import { AlteredLogo } from "~/components/svgs/brand/altered"
import {
    Button,
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle
} from "~/components/ui/primitives/inputs"
import { cn } from "~/utils/ui"

const navigationMenuData: NavigationMenuData[] = [
    { title: "Overview", href: "/#overview" },
    {
        title: "Concepts",
        href: "/#concepts",
        children: [
            { title: "Start", href: "/#start", description: "Begin your journey with Altered" },
            { title: "Ingest", href: "/#ingest", description: "Learn about data ingestion in Altered" },
            { title: "Datasets", href: "/#datasets", description: "Store & integrate every type of data." },
            { title: "Focus", href: "/#focus", description: "Discover the focus feature in Altered" },
            { title: "Intelligence", href: "/#intelligence", description: "Explore AI capabilities in Altered" },
            { title: "Systems", href: "/#systems", description: "Learn about Altered's system architecture" }
        ]
    },
    { title: "Use Cases", href: "/#use-cases" },
    { title: "Docs", href: "/docs" }
]

type NavigationMenuData = {
    title: string
    description?: string
    href?: string
    children?: NavigationMenuData[]
}

export function Header(): JSX.Element {
    return (
        <header className="fixed left-0 right-0 top-0 z-10 p-4">
            <div className="flex w-full flex-row items-center justify-between border bg-alternate-upper-quarter before:absolute before:inset-4 before:z-[-1] before:backdrop-blur dark:shadow-none">
                {/* Logo. */}
                <div className="flex items-center justify-center gap-3 p-6">
                    <AlteredLogo className="h-6" />
                    <p className="bg-accent-alternate px-2 py-0.5 font-mono text-12 font-bold">{"preflight"}</p>
                </div>

                {/* Menu bar links. */}

                <NavigationMenuDemo />

                {"isLocalhost" && (
                    <Button asChild color="accent" className="font-mono">
                        <Link href="altered/start">{"go to app"}</Link>
                    </Button>
                )}

                {/* Sign in/out button. */}

                <div className="flex flex-row items-center justify-center p-4">
                    {!"user" ? (
                        <form action="/api/sign-out" method="POST">
                            <Button type="submit" color="danger" className="flex h-auto p-0">
                                {"Sign Out"}
                            </Button>
                        </form>
                    ) : (
                        <Button asChild style="outline" className="font-mono">
                            <Link href="/#waitlist" className="h-auto">
                                {"join the waitlist"}
                            </Link>
                        </Button>
                    )}
                </div>
            </div>
        </header>
    )
}

export function NavigationMenuDemo() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                {navigationMenuData.map(category =>
                    category.children ? (
                        <NavigationMenuItem key={category.title}>
                            <NavigationMenuTrigger className="font-mono">{category.title.toLowerCase()}</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                    {category.children?.map(item => (
                                        <ListItem key={item.title} title={item.title + "."} href={item.href}>
                                            {item.description}
                                        </ListItem>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    ) : (
                        <NavigationMenuItem key={category.title}>
                            <Link href="/docs" legacyBehavior passHref>
                                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "font-mono")}>
                                    {category.title.toLowerCase()}
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    )
                )}
            </NavigationMenuList>
        </NavigationMenu>
    )
}

const ListItem = forwardRef<ElementRef<"a">, ComponentPropsWithoutRef<"a">>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 p-3 leading-none no-underline outline-none transition-colors hover:bg-main-eighth focus:bg-accent-alternate",
                        className
                    )}
                    {...props}
                >
                    <div className="text-14 font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-14 leading-snug text-main-upper-quarter">{children}</p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
