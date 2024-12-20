import { memo } from "react"
import { toast } from "sonner"
import { useCopyToClipboard } from "usehooks-ts"
import { Button } from "~/components/ui/primitives/inputs"
import { cn } from "~/domains/ai-chat/lib/utils"
import { type UIBlock } from "./block"
import { CopyIcon, DeltaIcon, RedoIcon, UndoIcon } from "./icons"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/primitives/indicators"

type BlockActionsProps = {
    block: UIBlock
    handleVersionChange: (type: "next" | "prev" | "toggle" | "latest") => void
    currentVersionIndex: number
    isCurrentVersion: boolean
    mode: "read-only" | "edit" | "diff"
}

function PureBlockActions({ block, handleVersionChange, currentVersionIndex, isCurrentVersion, mode }: BlockActionsProps) {
    const copyToClipboard = useCopyToClipboard()[1]

    return (
        <div className="flex flex-row gap-4px">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        style="outline"
                        className="h-fit p-8px dark:hover:bg-zinc-700"
                        onClick={() => {
                            void copyToClipboard(block.content)
                            toast.success("Copied to clipboard!")
                        }}
                        disabled={block.status === "streaming"}
                    >
                        <CopyIcon size={18} />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Copy to clipboard</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        style="outline"
                        className="!pointer-events-auto h-fit p-8px dark:hover:bg-zinc-700"
                        onClick={() => {
                            handleVersionChange("prev")
                        }}
                        disabled={currentVersionIndex === 0 || block.status === "streaming"}
                    >
                        <UndoIcon size={18} />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>View Previous version</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        style="outline"
                        className="!pointer-events-auto h-fit p-8px dark:hover:bg-zinc-700"
                        onClick={() => {
                            handleVersionChange("next")
                        }}
                        disabled={isCurrentVersion || block.status === "streaming"}
                    >
                        <RedoIcon size={18} />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>View Next version</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        style="outline"
                        className={cn("!pointer-events-auto h-fit p-8px dark:hover:bg-zinc-700", {
                            "bg-main/sixteenth": mode === "diff"
                        })}
                        onClick={() => {
                            handleVersionChange("toggle")
                        }}
                        disabled={block.status === "streaming" || currentVersionIndex === 0}
                    >
                        <DeltaIcon size={18} />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>View changes</TooltipContent>
            </Tooltip>
        </div>
    )
}

export const BlockActions = memo(PureBlockActions, (prevProps, nextProps) => {
    if (prevProps.block.status === "streaming" && nextProps.block.status === "streaming") {
        return true
    }

    return false
})
