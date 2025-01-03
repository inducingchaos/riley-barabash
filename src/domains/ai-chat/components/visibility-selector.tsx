"use client"

import { type ReactNode, useMemo, useState } from "react"
import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "~/components/ui/primitives/inputs"
import { cn } from "~/domains/ai-chat/lib/utils"

import { CheckCircleFillIcon, ChevronDownIcon, GlobeIcon, LockIcon } from "./icons"
import { useChatVisibility } from "~/domains/ai-chat/hooks/use-chat-visibility"

export type VisibilityType = "private" | "public"

const visibilities: Array<{
    id: VisibilityType
    label: string
    description: string
    icon: ReactNode
}> = [
    {
        id: "private",
        label: "Private",
        description: "Only you can access this chat",
        icon: <LockIcon />
    },
    {
        id: "public",
        label: "Public",
        description: "Anyone with the link can access this chat",
        icon: <GlobeIcon />
    }
]

export function VisibilitySelector({
    chatId,
    className,
    selectedVisibilityType
}: {
    chatId: string
    selectedVisibilityType: VisibilityType
} & React.ComponentProps<typeof Button>) {
    const [open, setOpen] = useState(false)

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { visibilityType, setVisibilityType } = useChatVisibility({
        chatId,
        initialVisibility: selectedVisibilityType
    })

    const selectedVisibility = useMemo(
        () => visibilities.find(visibility => visibility.id === visibilityType),
        [visibilityType]
    )

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger
                asChild
                className={cn("w-fit data-[state=open]:bg-main/sixteenth data-[state=open]:text-main", className)}
            >
                <Button style="outline" className="hidden md:flex md:h-[34px] md:px-8px">
                    {selectedVisibility?.icon}
                    {selectedVisibility?.label}
                    <ChevronDownIcon />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="min-w-[300px]">
                {visibilities.map(visibility => (
                    <DropdownMenuItem
                        key={visibility.id}
                        onSelect={() => {
                            setVisibilityType(visibility.id)
                            setOpen(false)
                        }}
                        className="group/item flex flex-row items-center justify-between gap-16px"
                        data-active={visibility.id === visibilityType}
                    >
                        <div className="flex flex-col items-start gap-4px">
                            {visibility.label}
                            {visibility.description && <div className="text-12px text-main/half">{visibility.description}</div>}
                        </div>
                        <div className="text-accent-constant opacity-zero group-data-[active=true]/item:opacity-full dark:text-alternate-constant">
                            <CheckCircleFillIcon />
                        </div>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
