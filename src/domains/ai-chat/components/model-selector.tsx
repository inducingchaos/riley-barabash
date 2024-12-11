"use client"

import { startTransition, useMemo, useOptimistic, useState } from "react"

import { saveModelId } from "~/app/experimental/ai-chat/(chat)/actions"
import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "~/components/ui/primitives/inputs"
import { models } from "~/domains/ai-chat/lib/ai/models"
import { cn } from "~/domains/ai-chat/lib/utils"

import { CheckCircleFillIcon, ChevronDownIcon } from "./icons"

export function ModelSelector({
    selectedModelId,
    className
}: {
    selectedModelId: string
} & React.ComponentProps<typeof Button>) {
    const [open, setOpen] = useState(false)
    const [optimisticModelId, setOptimisticModelId] = useOptimistic(selectedModelId)

    const selectedModel = useMemo(() => models.find(model => model.id === optimisticModelId), [optimisticModelId])

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger
                asChild
                className={cn("data-[state=open]:text-accent-foreground w-fit data-[state=open]:bg-accent", className)}
            >
                <Button style="outline" className="md:h-[34px] md:px-2">
                    {selectedModel?.label}
                    <ChevronDownIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-[300px]">
                {models.map(model => (
                    <DropdownMenuItem
                        key={model.id}
                        onSelect={() => {
                            setOpen(false)

                            startTransition(() => {
                                setOptimisticModelId(model.id)
                                void saveModelId(model.id)
                            })
                        }}
                        className="group/item flex flex-row items-center justify-between gap-4"
                        data-active={model.id === optimisticModelId}
                    >
                        <div className="flex flex-col items-start gap-1">
                            {model.label}
                            {model.description && <div className="text-xs text-muted-foreground">{model.description}</div>}
                        </div>
                        <div className="text-primary dark:text-primary-foreground opacity-0 group-data-[active=true]/item:opacity-100">
                            <CheckCircleFillIcon />
                        </div>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
