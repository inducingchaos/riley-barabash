"server only"
"use server"

import { revalidatePath } from "next/cache"
import { db } from "~/server/data"
import { messages } from "~/server/data/schemas/iiinput"
import { eq, asc } from "drizzle-orm"

export async function submitMessage(message: string) {
    const now = new Date()

    // Store user message with current timestamp
    await db.insert(messages).values({
        userId: "0221",
        content: message,
        role: "user",
        createdAt: now
    })

    // Add 1 second delay for AI message
    const aiTimestamp = new Date(now.getTime() + 1000)

    // TODO: Add AI SDK integration here
    // Simulate AI response for now
    const aiResponse = `AI response to: ${message}`

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
