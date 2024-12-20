import type { ComponentProps } from "react"

import { type SidebarTrigger, useSidebar } from "~/components/ui/layout/navigation"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/primitives/indicators"

import { SidebarLeftIcon } from "./icons"
import { Button } from "~/components/ui/primitives/inputs"

export function SidebarToggle({ className: _className }: ComponentProps<typeof SidebarTrigger>) {
    const { toggleSidebar } = useSidebar()

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button onClick={toggleSidebar} style="outline" className="md:h-fit md:px-8px">
                    <SidebarLeftIcon size={16} />
                </Button>
            </TooltipTrigger>
            <TooltipContent align="start">Toggle Sidebar</TooltipContent>
        </Tooltip>
    )
}
