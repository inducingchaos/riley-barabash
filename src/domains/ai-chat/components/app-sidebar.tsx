"use client"

// import type { User } from "next-auth"
import { useRouter } from "next/navigation"

import Link from "next/link"
import { Button } from "~/components/ui/primitives/inputs"
import { PlusIcon } from "~/domains/ai-chat/components/icons"
import { SidebarHistory } from "~/domains/ai-chat/components/sidebar-history"
import { SidebarUserNav } from "~/domains/ai-chat/components/sidebar-user-nav"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    useSidebar
} from "~/domains/ai-chat/components/ui/sidebar"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"

export function AppSidebar({ user }: { user: { email: string } | undefined }) {
    const router = useRouter()
    const { setOpenMobile } = useSidebar()

    return (
        <Sidebar className="group-data-[side=left]:border-r-0">
            <SidebarHeader>
                <SidebarMenu>
                    <div className="flex flex-row items-center justify-between">
                        <Link
                            href="/"
                            onClick={() => {
                                setOpenMobile(false)
                            }}
                            className="flex flex-row items-center gap-3"
                        >
                            <span className="hover:bg-muted rounded-md cursor-pointer px-2 text-18 font-semibold">Chatbot</span>
                        </Link>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    style="ghost"
                                    type="button"
                                    className="h-fit p-2"
                                    onClick={() => {
                                        setOpenMobile(false)
                                        router.push("/")
                                        router.refresh()
                                    }}
                                >
                                    <PlusIcon />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent align="end">New Chat</TooltipContent>
                        </Tooltip>
                    </div>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarHistory user={user} />
            </SidebarContent>
            <SidebarFooter>{user && <SidebarUserNav user={user} />}</SidebarFooter>
        </Sidebar>
    )
}
