"use client"
import { ChevronUp } from "lucide-react"
import Image from "next/image"
// import type { User } from "next-auth"
// import { signOut } from "next-auth/react"
import { useTheme } from "next-themes"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "~/components/ui/primitives/inputs"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "~/components/ui/layout/navigation"

export function SidebarUserNav({ user }: { user: { email: string } }) {
    const { setTheme, theme } = useTheme()

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        {/* was h-48px */}
                        <SidebarMenuButton className="h-48px bg-alternate data-[state=open]:bg-main/sixteenth data-[state=open]:text-main">
                            <Image
                                src={`https://avatar.vercel.sh/${user.email}`}
                                alt={user.email ?? "User Avatar"}
                                width={24}
                                height={24}
                                className="rounded-full"
                            />
                            <span className="truncate">{user?.email}</span>
                            <ChevronUp className="ml-auto" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                        <DropdownMenuItem
                            className="cursor-pointer"
                            onSelect={() => setTheme(theme === "dark" ? "light" : "dark")}
                        >
                            {`Toggle ${theme === "light" ? "dark" : "light"} mode`}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <button
                                type="button"
                                className="w-full cursor-pointer"
                                onClick={() => {
                                    // signOut({
                                    //     redirectTo: "/"
                                    // })
                                    console.log("sign out")
                                }}
                            >
                                Sign out
                            </button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
