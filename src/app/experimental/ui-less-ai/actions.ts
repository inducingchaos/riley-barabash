"server only"
"use server"

import { revalidatePath } from "next/cache"
import { db } from "~/server/data"
import { messages } from "~/server/data/schemas/riley-barabash"
import { eq } from "drizzle-orm"

export async function submitMessage(message: string) {
    await new Promise(resolve => setTimeout(resolve, 5000)) // Artificial 5s delay

    await db.insert(messages).values({
        userId: "0221",
        content: message
    })

    console.log(message)

    revalidatePath("/experimental/ui-less-ai")
}

export async function getMessages() {
    return await db.query.messages.findMany({
        where: (messages, { eq }) => eq(messages.userId, "0221"),
        orderBy: (messages, { asc }) => [asc(messages.createdAt)]
    })
}

export async function updateMessage(messageId: string, content: string) {
    await new Promise(resolve => setTimeout(resolve, 2000)) // Artificial 2s delay

    await db
        .update(messages)
        .set({ content: content + " (edited - test)" })
        .where(eq(messages.id, messageId))

    revalidatePath("/experimental/ui-less-ai")
}

export async function deleteMessage(messageId: string) {
    await new Promise(resolve => setTimeout(resolve, 2000)) // Artificial 2s delay

    await db.delete(messages).where(eq(messages.id, messageId))

    revalidatePath("/experimental/ui-less-ai")
}
