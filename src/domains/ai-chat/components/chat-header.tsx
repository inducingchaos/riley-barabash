"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useWindowSize } from "usehooks-ts"

import { ModelSelector } from "~/domains/ai-chat/components/model-selector"
import { SidebarToggle } from "~/domains/ai-chat/components/sidebar-toggle"
import { Button } from "~/components/ui/primitives/inputs"
import { PlusIcon, VercelIcon } from "./icons"
import { useSidebar } from "~/components/ui/layout/navigation"
import { memo } from "react"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/primitives/indicators"
import { type VisibilityType, VisibilitySelector } from "./visibility-selector"

function PureChatHeader({
    chatId,
    selectedModelId,
    selectedVisibilityType,
    isReadonly
}: {
    chatId: string
    selectedModelId: string
    selectedVisibilityType: VisibilityType
    isReadonly: boolean
}) {
    const router = useRouter()
    const { open } = useSidebar()

    const { width: windowWidth } = useWindowSize()

    return (
        <header className="sticky top-0px flex items-center gap-8px bg-alternate px-8px py-6px md:px-8px">
            <SidebarToggle />

            {(!open || windowWidth < 768) && (
                <Tooltip>
                    <Button
                        style="outline"
                        className="order-2 ml-auto px-8px md:order-1 md:ml-0px md:h-fit md:px-8px"
                        onClick={() => {
                            router.push("/")
                            router.refresh()
                        }}
                        asChild
                    >
                        <TooltipTrigger>
                            <PlusIcon />
                            <span className="md:sr-only">New Chat</span>
                        </TooltipTrigger>
                    </Button>
                    <TooltipContent>New Chat</TooltipContent>
                </Tooltip>
            )}

            {!isReadonly && <ModelSelector selectedModelId={selectedModelId} className="order-1 md:order-2" />}

            {!isReadonly && (
                <VisibilitySelector
                    chatId={chatId}
                    selectedVisibilityType={selectedVisibilityType}
                    className="order-1 md:order-3"
                />
            )}

            <Button
                className="order-4 hidden h-fit bg-zinc-900 px-8px py-6px text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 md:ml-auto md:flex md:h-[34px]"
                asChild
            >
                <Link
                    href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fai-chatbot&env=AUTH_SECRET,OPENAI_API_KEY&envDescription=Learn%20more%20about%20how%20to%20get%20the%20API%20Keys%20for%20the%20application&envLink=https%3A%2F%2Fgithub.com%2Fvercel%2Fai-chatbot%2Fblob%2Fmain%2F.env.example&demo-title=AI%20Chatbot&demo-description=An%20Open-Source%20AI%20Chatbot%20Template%20Built%20With%20Next.js%20and%20the%20AI%20SDK%20by%20Vercel.&demo-url=https%3A%2F%2Fchat.vercel.ai&stores=%5B%7B%22type%22:%22postgres%22%7D,%7B%22type%22:%22blob%22%7D%5D"
                    target="_noblank"
                >
                    <VercelIcon size={16} />
                    Deploy with Vercel
                </Link>
            </Button>
        </header>
    )
}

export const ChatHeader = memo(PureChatHeader, (prevProps, nextProps) => {
    return prevProps.selectedModelId === nextProps.selectedModelId
})
