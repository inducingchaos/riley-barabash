import type { Message } from "ai"
import { toast } from "sonner"
import { useSWRConfig } from "swr"
import { useCopyToClipboard } from "usehooks-ts"

import type { Vote } from "~/domains/ai-chat/lib/db/schema"
import { getMessageIdFromAnnotations } from "~/domains/ai-chat/lib/utils"

import { CopyIcon, ThumbDownIcon, ThumbUpIcon } from "./icons"
import { Button } from "~/components/ui/primitives/inputs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"

export function MessageActions({
    chatId,
    message,
    vote,
    isLoading
}: {
    chatId: string
    message: Message
    vote: Vote | undefined
    isLoading: boolean
}) {
    const { mutate } = useSWRConfig()
    const copyToClipboard = useCopyToClipboard()[1]

    if (isLoading) return null
    if (message.role === "user") return null
    if (message.toolInvocations && message.toolInvocations.length > 0) return null

    return (
        <TooltipProvider delayDuration={0}>
            <div className="flex flex-row gap-2">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            className="text-muted-foreground h-fit px-2 py-1"
                            style="outline"
                            onClick={async () => {
                                await copyToClipboard(message.content)
                                toast.success("Copied to clipboard!")
                            }}
                        >
                            <CopyIcon />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Copy</TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            className="text-muted-foreground !pointer-events-auto h-fit px-2 py-1"
                            disabled={vote?.isUpvoted}
                            style="outline"
                            onClick={async () => {
                                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                                const messageId = getMessageIdFromAnnotations(message)

                                const upvote = fetch("/api/vote", {
                                    method: "PATCH",
                                    body: JSON.stringify({
                                        chatId,
                                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                                        messageId,
                                        type: "up"
                                    })
                                })

                                toast.promise(upvote, {
                                    loading: "Upvoting Response...",
                                    success: () => {
                                        void mutate<Array<Vote>>(
                                            `/api/vote?chatId=${chatId}`,
                                            currentVotes => {
                                                if (!currentVotes) return []

                                                const votesWithoutCurrent = currentVotes.filter(
                                                    vote => vote.messageId !== message.id
                                                )

                                                return [
                                                    ...votesWithoutCurrent,
                                                    {
                                                        chatId,
                                                        messageId: message.id,
                                                        isUpvoted: true
                                                    }
                                                ]
                                            },
                                            { revalidate: false }
                                        )

                                        return "Upvoted Response!"
                                    },
                                    error: "Failed to upvote response."
                                })
                            }}
                        >
                            <ThumbUpIcon />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Upvote Response</TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            className="text-muted-foreground !pointer-events-auto h-fit px-2 py-1"
                            style="outline"
                            disabled={vote && !vote.isUpvoted}
                            onClick={async () => {
                                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                                const messageId = getMessageIdFromAnnotations(message)

                                const downvote = fetch("/api/vote", {
                                    method: "PATCH",
                                    body: JSON.stringify({
                                        chatId,
                                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                                        messageId,
                                        type: "down"
                                    })
                                })

                                toast.promise(downvote, {
                                    loading: "Downvoting Response...",
                                    success: () => {
                                        void mutate<Array<Vote>>(
                                            `/api/vote?chatId=${chatId}`,
                                            currentVotes => {
                                                if (!currentVotes) return []

                                                const votesWithoutCurrent = currentVotes.filter(
                                                    vote => vote.messageId !== message.id
                                                )

                                                return [
                                                    ...votesWithoutCurrent,
                                                    {
                                                        chatId,
                                                        messageId: message.id,
                                                        isUpvoted: false
                                                    }
                                                ]
                                            },
                                            { revalidate: false }
                                        )

                                        return "Downvoted Response!"
                                    },
                                    error: "Failed to downvote response."
                                })
                            }}
                        >
                            <ThumbDownIcon />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Downvote Response</TooltipContent>
                </Tooltip>
            </div>
        </TooltipProvider>
    )
}
