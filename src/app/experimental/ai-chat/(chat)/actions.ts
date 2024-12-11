"use server"

import { type CoreUserMessage, generateText } from "ai"
import { cookies } from "next/headers"

import { customModel } from "~/domains/ai-chat/lib/ai"
import {
    deleteMessagesByChatIdAfterTimestamp,
    getMessageById,
    updateChatVisibilityById
} from "~/domains/ai-chat/lib/db/queries"
import { type VisibilityType } from "~/domains/ai-chat/components/visibility-selector"

export async function saveModelId(model: string) {
    const cookieStore = await cookies()
    cookieStore.set("model-id", model)
}

export async function generateTitleFromUserMessage({ message }: { message: CoreUserMessage }) {
    const { text: title } = await generateText({
        model: customModel("gpt-4o-mini"),
        system: `\n
    - you will generate a short title based on the first message a user begins a conversation with
    - ensure it is not more than 80 characters long
    - the title should be a summary of the user's message
    - do not use quotes or colons`,
        prompt: JSON.stringify(message)
    })

    return title
}

export async function deleteTrailingMessages({ id }: { id: string }) {
    const [message] = await getMessageById({ id })

    await deleteMessagesByChatIdAfterTimestamp({
        chatId: message?.chatId ?? "",
        timestamp: message?.createdAt ?? new Date()
    })
}

export async function updateChatVisibility({ chatId, visibility }: { chatId: string; visibility: VisibilityType }) {
    await updateChatVisibilityById({ chatId, visibility })
}