"use client"

import { isToday, isYesterday, subMonths, subWeeks } from "date-fns"
import Link from "next/link"
import { useParams, usePathname, useRouter } from "next/navigation"
// import type { User } from "next-auth"
import { memo, useEffect, useState } from "react"
import { toast } from "sonner"
import useSWR from "swr"

import {
    CheckCircleFillIcon,
    GlobeIcon,
    LockIcon,
    MoreHorizontalIcon,
    ShareIcon,
    TrashIcon
} from "~/domains/ai-chat/components/icons"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "~/components/ui/primitives/indicators"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from "~/components/ui/primitives/inputs"
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar
} from "~/components/ui/layout/navigation"
import type { Chat } from "~/domains/ai-chat/lib/db/schema"
import { fetcher } from "~/domains/ai-chat/lib/utils"
import { useChatVisibility } from "~/domains/ai-chat/hooks/use-chat-visibility"

type GroupedChats = {
    today: Chat[]
    yesterday: Chat[]
    lastWeek: Chat[]
    lastMonth: Chat[]
    older: Chat[]
}

const PureChatItem = ({
    chat,
    isActive,
    onDelete,
    setOpenMobile
}: {
    chat: Chat
    isActive: boolean
    onDelete: (chatId: string) => void
    setOpenMobile: (open: boolean) => void
}) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { visibilityType, setVisibilityType } = useChatVisibility({
        chatId: chat.id,
        initialVisibility: chat.visibility
    })

    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive}>
                <Link href={`/experimental/ai-chat/chat/${chat.id}`} onClick={() => setOpenMobile(false)}>
                    <span>{chat.title}</span>
                </Link>
            </SidebarMenuButton>

            <DropdownMenu modal={true}>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuAction
                        className="mr-2px data-[state=open]:bg-main/sixteenth data-[state=open]:text-main"
                        showOnHover={!isActive}
                    >
                        <MoreHorizontalIcon />
                        <span className="sr-only">More</span>
                    </SidebarMenuAction>
                </DropdownMenuTrigger>

                <DropdownMenuContent side="bottom" align="end">
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="cursor-pointer">
                            <ShareIcon />
                            <span>Share</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem
                                    className="cursor-pointer flex-row justify-between"
                                    onClick={() => {
                                        setVisibilityType("private")
                                    }}
                                >
                                    <div className="flex flex-row items-center gap-8px">
                                        <LockIcon size={12} />
                                        <span>Private</span>
                                    </div>
                                    {visibilityType === "private" ? <CheckCircleFillIcon /> : null}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer flex-row justify-between"
                                    onClick={() => {
                                        setVisibilityType("public")
                                    }}
                                >
                                    <div className="flex flex-row items-center gap-8px">
                                        <GlobeIcon />
                                        <span>Public</span>
                                    </div>
                                    {visibilityType === "public" ? <CheckCircleFillIcon /> : null}
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>

                    <DropdownMenuItem
                        className="cursor-pointer text-danger focus:bg-danger/quarter focus:text-danger dark:text-red-500"
                        onSelect={() => onDelete(chat.id)}
                    >
                        <TrashIcon />
                        <span>Delete</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    )
}

export const ChatItem = memo(PureChatItem, (prevProps, nextProps) => {
    if (prevProps.isActive !== nextProps.isActive) return false
    return true
})

export function SidebarHistory({ user }: { user: { email: string } | undefined }) {
    const { setOpenMobile } = useSidebar()
    const { id } = useParams()
    const pathname = usePathname()
    const {
        data: history,
        isLoading,
        mutate
    } = useSWR<Array<Chat>>(user ? "/experimental/ai-chat/api/history" : null, fetcher, {
        fallbackData: []
    })

    useEffect(() => {
        void mutate()
    }, [pathname, mutate])

    const [deleteId, setDeleteId] = useState<string | null>(null)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const router = useRouter()
    const handleDelete = async () => {
        const deletePromise = fetch(`/experimental/ai-chat/api/chat?id=${deleteId}`, {
            method: "DELETE"
        })

        toast.promise(deletePromise, {
            loading: "Deleting chat...",
            success: () => {
                void mutate(history => {
                    if (history) {
                        return history.filter(h => h.id !== id)
                    }
                })
                return "Chat deleted successfully"
            },
            error: "Failed to delete chat"
        })

        setShowDeleteDialog(false)

        if (deleteId === id) {
            router.push("/")
        }
    }

    if (!user) {
        return (
            <SidebarGroup>
                <SidebarGroupContent>
                    <div className="flex w-full flex-row items-center justify-center gap-8px text-14px text-zinc-500">
                        <div>Login to save and revisit previous chats!</div>
                    </div>
                </SidebarGroupContent>
            </SidebarGroup>
        )
    }

    if (isLoading) {
        return (
            <SidebarGroup>
                <div className="px-8px py-4px text-12px text-main/half">Today</div>
                <SidebarGroupContent>
                    <div className="flex flex-col">
                        {[44, 32, 28, 64, 52].map(item => (
                            <div key={item} className="flex h-32px items-center gap-8px rounded-6px px-8px">
                                <div
                                    className="h-16px max-w-[--skeleton-width] flex-1 rounded-6px bg-main/eighth"
                                    style={
                                        {
                                            "--skeleton-width": `${item}%`
                                        } as React.CSSProperties
                                    }
                                />
                            </div>
                        ))}
                    </div>
                </SidebarGroupContent>
            </SidebarGroup>
        )
    }

    if (history?.length === 0) {
        return (
            <SidebarGroup>
                <SidebarGroupContent>
                    <div className="flex w-full flex-row items-center justify-center gap-8px text-14px text-zinc-500">
                        <div>Your conversations will appear here once you start chatting!</div>
                    </div>
                </SidebarGroupContent>
            </SidebarGroup>
        )
    }

    const groupChatsByDate = (chats: Chat[]): GroupedChats => {
        const now = new Date()
        const oneWeekAgo = subWeeks(now, 1)
        const oneMonthAgo = subMonths(now, 1)

        return chats.reduce(
            (groups, chat) => {
                const chatDate = new Date(chat.createdAt)

                if (isToday(chatDate)) {
                    groups.today.push(chat)
                } else if (isYesterday(chatDate)) {
                    groups.yesterday.push(chat)
                } else if (chatDate > oneWeekAgo) {
                    groups.lastWeek.push(chat)
                } else if (chatDate > oneMonthAgo) {
                    groups.lastMonth.push(chat)
                } else {
                    groups.older.push(chat)
                }

                return groups
            },
            {
                today: [],
                yesterday: [],
                lastWeek: [],
                lastMonth: [],
                older: []
            } as GroupedChats
        )
    }

    return (
        <>
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {history &&
                            (() => {
                                const groupedChats = groupChatsByDate(history)

                                return (
                                    <>
                                        {groupedChats.today.length > 0 && (
                                            <>
                                                <div className="px-8px py-4px text-12px text-main/half">Today</div>
                                                {groupedChats.today.map(chat => (
                                                    <ChatItem
                                                        key={chat.id}
                                                        chat={chat}
                                                        isActive={chat.id === id}
                                                        onDelete={chatId => {
                                                            setDeleteId(chatId)
                                                            setShowDeleteDialog(true)
                                                        }}
                                                        setOpenMobile={setOpenMobile}
                                                    />
                                                ))}
                                            </>
                                        )}

                                        {groupedChats.yesterday.length > 0 && (
                                            <>
                                                <div className="mt-24px px-8px py-4px text-12px text-main/half">Yesterday</div>
                                                {groupedChats.yesterday.map(chat => (
                                                    <ChatItem
                                                        key={chat.id}
                                                        chat={chat}
                                                        isActive={chat.id === id}
                                                        onDelete={chatId => {
                                                            setDeleteId(chatId)
                                                            setShowDeleteDialog(true)
                                                        }}
                                                        setOpenMobile={setOpenMobile}
                                                    />
                                                ))}
                                            </>
                                        )}

                                        {groupedChats.lastWeek.length > 0 && (
                                            <>
                                                <div className="mt-24px px-8px py-4px text-12px text-main/half">
                                                    Last 7 days
                                                </div>
                                                {groupedChats.lastWeek.map(chat => (
                                                    <ChatItem
                                                        key={chat.id}
                                                        chat={chat}
                                                        isActive={chat.id === id}
                                                        onDelete={chatId => {
                                                            setDeleteId(chatId)
                                                            setShowDeleteDialog(true)
                                                        }}
                                                        setOpenMobile={setOpenMobile}
                                                    />
                                                ))}
                                            </>
                                        )}

                                        {groupedChats.lastMonth.length > 0 && (
                                            <>
                                                <div className="mt-24px px-8px py-4px text-12px text-main/half">
                                                    Last 30 days
                                                </div>
                                                {groupedChats.lastMonth.map(chat => (
                                                    <ChatItem
                                                        key={chat.id}
                                                        chat={chat}
                                                        isActive={chat.id === id}
                                                        onDelete={chatId => {
                                                            setDeleteId(chatId)
                                                            setShowDeleteDialog(true)
                                                        }}
                                                        setOpenMobile={setOpenMobile}
                                                    />
                                                ))}
                                            </>
                                        )}

                                        {groupedChats.older.length > 0 && (
                                            <>
                                                <div className="mt-24px px-8px py-4px text-12px text-main/half">Older</div>
                                                {groupedChats.older.map(chat => (
                                                    <ChatItem
                                                        key={chat.id}
                                                        chat={chat}
                                                        isActive={chat.id === id}
                                                        onDelete={chatId => {
                                                            setDeleteId(chatId)
                                                            setShowDeleteDialog(true)
                                                        }}
                                                        setOpenMobile={setOpenMobile}
                                                    />
                                                ))}
                                            </>
                                        )}
                                    </>
                                )
                            })()}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your chat and remove it from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
