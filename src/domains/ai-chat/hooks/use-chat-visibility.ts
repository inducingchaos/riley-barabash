"use client"

import { updateChatVisibility } from "~/app/experimental/ai-chat/(chat)/actions"
import { type VisibilityType } from "~/domains/ai-chat/components/visibility-selector"
import { type Chat } from "~/domains/ai-chat/lib/db/schema"
import { useMemo } from "react"
import useSWR, { useSWRConfig } from "swr"

export function useChatVisibility({ chatId, initialVisibility }: { chatId: string; initialVisibility: VisibilityType }) {
    const { mutate, cache } = useSWRConfig()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const history: Array<Chat> = cache.get("/experimental/ai-chat/api/history")?.data

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { data: localVisibility, mutate: setLocalVisibility } = useSWR(`${chatId}-visibility`, null, {
        fallbackData: initialVisibility
    })

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const visibilityType = useMemo(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        if (!history) return localVisibility
        const chat = history.find(chat => chat.id === chatId)
        if (!chat) return "private"
        return chat.visibility
    }, [history, chatId, localVisibility])

    const setVisibilityType = (updatedVisibilityType: VisibilityType) => {
        void setLocalVisibility(updatedVisibilityType)

        void mutate<Array<Chat>>(
            "/experimental/ai-chat/api/history",
            history => {
                return history
                    ? history.map(chat => {
                          if (chat.id === chatId) {
                              return {
                                  ...chat,
                                  visibility: updatedVisibilityType
                              }
                          }
                          return chat
                      })
                    : []
            },
            { revalidate: false }
        )

        void updateChatVisibility({
            chatId: chatId,
            visibility: updatedVisibilityType
        })
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { visibilityType, setVisibilityType }
}
