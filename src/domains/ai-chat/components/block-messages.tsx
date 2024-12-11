import { type Dispatch, memo, type SetStateAction } from "react"
import { type UIBlock } from "./block"
import { PreviewMessage } from "./message"
import { useScrollToBottom } from "./use-scroll-to-bottom"
import { type Vote } from "~/domains/ai-chat/lib/db/schema"
import { type ChatRequestOptions, type Message } from "ai"

type BlockMessagesProps = {
    chatId: string
    block: UIBlock
    setBlock: Dispatch<SetStateAction<UIBlock>>
    isLoading: boolean
    votes: Array<Vote> | undefined
    messages: Array<Message>
    setMessages: (messages: Message[] | ((messages: Message[]) => Message[])) => void
    reload: (chatRequestOptions?: ChatRequestOptions) => Promise<string | null | undefined>
    isReadonly: boolean
}

function PureBlockMessages({
    chatId,
    block,
    setBlock,
    isLoading,
    votes,
    messages,
    setMessages,
    reload,
    isReadonly
}: BlockMessagesProps) {
    const [messagesContainerRef, messagesEndRef] = useScrollToBottom<HTMLDivElement>()

    return (
        <div ref={messagesContainerRef} className="flex h-full flex-col items-center gap-4 overflow-y-scroll px-4 pt-20">
            {messages.map((message, index) => (
                <PreviewMessage
                    chatId={chatId}
                    key={message.id}
                    message={message}
                    block={block}
                    setBlock={setBlock}
                    isLoading={isLoading && index === messages.length - 1}
                    vote={votes ? votes.find(vote => vote.messageId === message.id) : undefined}
                    setMessages={setMessages}
                    reload={reload}
                    isReadonly={isReadonly}
                />
            ))}

            <div ref={messagesEndRef} className="min-h-[24px] min-w-[24px] shrink-0" />
        </div>
    )
}

function areEqual(prevProps: BlockMessagesProps, nextProps: BlockMessagesProps) {
    if (prevProps.block.status === "streaming" && nextProps.block.status === "streaming") {
        return true
    }

    return false
}

export const BlockMessages = memo(PureBlockMessages, areEqual)
