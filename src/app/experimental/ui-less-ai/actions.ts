"server only"
"use server"

import { revalidatePath } from "next/cache"
import { db } from "~/server/data"
import { messages } from "~/server/data/schemas/iiinput"
import { eq, asc } from "drizzle-orm"
import { generateText, type CoreUserMessage, type CoreAssistantMessage } from "ai"
import { customModel } from "~/domains/ai-chat/lib/ai"
import { digitalBrainAgent, type PromptContext } from "~/config/prompts"

type Message = {
    id: string
    content: string
    createdAt: string
    role: string
}

type SubmitOptions = {
    generateOnly?: boolean
    addOnly?: boolean
}

export async function submitMessage(chatHistory: Message[], options: SubmitOptions = {}) {
    const now = new Date()
    const aiTimestamp = new Date(now.getTime() + 1000)
    const lastMessage = chatHistory[chatHistory.length - 1]
    const messageContent = lastMessage?.content ?? ""

    // Handle message storage (skip if generateOnly)
    if (!options.generateOnly && messageContent.trim()) {
        await db.insert(messages).values({
            userId: "0221",
            content: messageContent,
            role: "user",
            createdAt: now
        })
    }

    // Skip AI generation if addOnly
    if (options.addOnly) {
        revalidatePath("/experimental/ui-less-ai")
        return
    }

    // Convert chat history to AI SDK format
    const aiMessages: (CoreUserMessage | CoreAssistantMessage)[] = chatHistory
        .filter(msg => msg.role === "user" || msg.role === "assistant")
        .map(msg => ({
            role: msg.role === "user" ? "user" : "assistant",
            content: msg.content
        })) as (CoreUserMessage | CoreAssistantMessage)[]

    const isGenerating = options.generateOnly ?? !messageContent.trim()
    const isLastMessageFromAI = lastMessage?.role === "assistant"

    const promptContext: PromptContext = {
        isGenerating,
        isLastMessageFromAI,
        lastMessage: lastMessage && {
            content: lastMessage.content,
            role: lastMessage.role as "user" | "assistant"
        }
    }

    // Generate AI response using the AI SDK with chat history
    const { text: aiResponse } = await generateText({
        model: customModel("gpt-4o-mini"),
        system: digitalBrainAgent.compose(promptContext),
        messages: aiMessages
    })

    await db.insert(messages).values({
        userId: "0221",
        content: aiResponse,
        role: "assistant",
        createdAt: aiTimestamp
    })

    revalidatePath("/experimental/ui-less-ai")
}

export async function getMessages() {
    return await db.select().from(messages).where(eq(messages.userId, "0221")).orderBy(asc(messages.createdAt))
}

export async function updateMessage(messageId: string, content: string) {
    await db.update(messages).set({ content }).where(eq(messages.id, messageId))

    revalidatePath("/experimental/ui-less-ai")
}

export async function deleteMessage(messageId: string) {
    await db.delete(messages).where(eq(messages.id, messageId))

    revalidatePath("/experimental/ui-less-ai")
}
