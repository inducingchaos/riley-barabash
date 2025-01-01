"server only"
"use server"

import { revalidatePath } from "next/cache"
import { db } from "~/server/data"
import { messages } from "~/server/data/schemas/iiinput"
import { eq, asc } from "drizzle-orm"
import { generateText, type CoreMessage } from "ai"
import { customModel } from "~/domains/ai-chat/lib/ai"

type Message = {
    id: string
    content: string
    createdAt: string
    role: string
}

export async function submitMessage(message: string, chatHistory: Message[]) {
    const now = new Date()
    const aiTimestamp = new Date(now.getTime() + 1000)

    // Store user message with current timestamp
    await db.insert(messages).values({
        userId: "0221",
        content: message,
        role: "user",
        createdAt: now
    })

    // Convert chat history to AI SDK format
    const aiMessages: CoreMessage[] = chatHistory
        .filter(msg => msg.role === "user" || msg.role === "assistant")
        .map(msg => ({
            role: msg.role === "user" ? "user" : "assistant",
            content: msg.content
        }))

    // Generate AI response using the AI SDK with chat history
    const { text: aiResponse } = await generateText({
        model: customModel("gpt-4o-mini"),
        system: "You are a helpful and knowledgeable AI assistant. Respond in a clear and concise manner.",
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
    await db
        .update(messages)
        .set({ content: content + " (edited - test)" })
        .where(eq(messages.id, messageId))

    revalidatePath("/experimental/ui-less-ai")
}

export async function deleteMessage(messageId: string) {
    await db.delete(messages).where(eq(messages.id, messageId))

    revalidatePath("/experimental/ui-less-ai")
}
