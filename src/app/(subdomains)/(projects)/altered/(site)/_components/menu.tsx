/**
 *
 */

"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
// import { AlteredLogo } from "~/components/svgs/brand/altered"
// import { Button } from "~/components/ui/primitives/inputs"

// const navigationMenuData: NavigationMenuData[] = [
//     { title: "Overview", href: "/#overview" },
//     {
//         title: "Concepts",
//         href: "/#concepts",
//         children: [
//             { title: "Start", href: "/#start", description: "Begin your journey with Altered" },
//             { title: "Ingest", href: "/#ingest", description: "Learn about data ingestion in Altered" },
//             { title: "Datasets", href: "/#datasets", description: "Store & integrate every type of data." },
//             { title: "Focus", href: "/#focus", description: "Discover the focus feature in Altered" },
//             { title: "Intelligence", href: "/#intelligence", description: "Explore AI capabilities in Altered" },
//             { title: "Systems", href: "/#systems", description: "Learn about Altered's system architecture" }
//         ]
//     },
//     { title: "Use Cases", href: "/#use-cases" },
//     { title: "Docs", href: "/docs" }
// ]

// type NavigationMenuData = {
//     title: string
//     description?: string
//     href?: string
//     children?: NavigationMenuData[]
// }

export function Menu(): JSX.Element {
    const [isHovered, setIsHovered] = useState(false)
    const [isBlurred, setIsBlurred] = useState(true)

    useEffect(() => {
        let timeoutId: NodeJS.Timeout
        if (!isHovered) {
            timeoutId = setTimeout(() => setIsBlurred(true), 2000)
        } else {
            setIsBlurred(false)
        }
        return () => clearTimeout(timeoutId)
    }, [isHovered])

    return (
        <header
            className="fixed bottom-0px z-10 p-16px"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={`flex w-full flex-row items-center justify-between border bg-alternate/-quarter backdrop-blur ${
                    isBlurred
                        ? "border-main/sixteenth transition-colors duration-1s ease-out"
                        : "border-main/eighth transition-colors duration-quarter ease-out"
                }`}
            >
                <div className="flex items-center justify-center gap-0px p-8px">
                    <MenuIcon
                        href="focus"
                        isBlurred={isBlurred}
                        path="M15 6h2v2h-2V6zm-2 4V8h2v2h-2zm-2 2v-2h2v2h-2zm-2 2v-2h2v2H9zm-2 2v-2h2v2H7zm-2 0h2v2H5v-2zm-2-2h2v2H3v-2zm0 0H1v-2h2v2zm8 2h2v2h-2v-2zm4-2v2h-2v-2h2zm2-2v2h-2v-2h2zm2-2v2h-2v-2h2zm2-2h-2v2h2V8zm0 0h2V6h-2v2z"
                    />
                    <MenuIcon
                        href="chat"
                        isBlurred={isBlurred}
                        path="M4 2h18v16H6v2H4v-2h2v-2h14V4H4v18H2V2h2zm5 7H7v2h2V9zm2 0h2v2h-2V9zm6 0h-2v2h2V9z"
                        isActive
                    />
                    <MenuIcon
                        href="ingest"
                        isBlurred={isBlurred}
                        path="M3 3h18v18H3V3zm16 16V5H5v14h14zm-6-8h4v2h-4v4h-2v-4H7v-2h4V7h2v4z"
                    />
                    <MenuIcon href="data" isBlurred={isBlurred} path="M4 4h8v2h10v14H2V4h2zm16 4H10V6H4v12h16V8z" />
                    <MenuIcon
                        href="/altered"
                        isBlurred={isBlurred}
                        path="M17 4h2v10h-2V4zm0 12h-2v2h2v2h2v-2h2v-2h-4zm-4-6h-2v10h2V10zm-8 2H3v2h2v6h2v-6h2v-2H5zm8-8h-2v2H9v2h6V6h-2V4zM5 4h2v6H5V4z"
                    />
                </div>
            </div>
        </header>
    )
}

function MenuIcon({ href, isBlurred, path, isActive }: { href: string; isBlurred: boolean; path: string; isActive?: boolean }) {
    return (
        <Link href={href} className="group p-8px text-main">
            <svg
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className={`w-24px ${
                    isBlurred
                        ? isActive
                            ? "text-main/quarter transition-colors duration-1s ease-out"
                            : "text-main/eighth transition-colors duration-1s ease-out"
                        : isActive
                          ? "text-main transition-colors duration-quarter ease-out group-hover:text-main/-quarter"
                          : "text-main/half transition-colors duration-quarter ease-out group-hover:text-main/3-8"
                }`}
            >
                <path d={path} />
            </svg>
        </Link>
    )
}
