import type { ComponentProps } from "react"

import { type SidebarTrigger, useSidebar } from "~/domains/ai-chat/components/ui/sidebar"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/domains/ai-chat/components/ui/tooltip"

import { SidebarLeftIcon } from "./icons"
import { Button } from "~/components/ui/primitives/inputs"

export function SidebarToggle({ className: _className }: ComponentProps<typeof SidebarTrigger>) {
    const { toggleSidebar } = useSidebar()

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button onClick={toggleSidebar} style="outline" className="md:h-fit md:px-2">
                    <SidebarLeftIcon size={16} />
                </Button>
            </TooltipTrigger>
            <TooltipContent align="start">Toggle Sidebar</TooltipContent>
        </Tooltip>
    )
}
