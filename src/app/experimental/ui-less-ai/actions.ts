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

    // Only insert user message if not generating
    if (message.trim()) {
        await db.insert(messages).values({
            userId: "0221",
            content: message,
            role: "user",
            createdAt: now
        })
    }

    // Convert chat history to AI SDK format
    const aiMessages: CoreMessage[] = chatHistory
        .filter(msg => msg.role === "user" || msg.role === "assistant")
        .map(msg => ({
            role: msg.role === "user" ? "user" : "assistant",
            content: msg.content
        }))

    const lastMessage = aiMessages[aiMessages.length - 1]
    const isGenerating = !message.trim()
    const isLastMessageFromAI = lastMessage?.role === "assistant"

    // Construct the system prompt
    let systemPrompt = `You are an AI representation of the user, meant to serve as the user's digital brain. You should mimic and replicate the user's communication patterns as closely as possible as you learn more about them.
        
Your main purpose is to help the user with their thoughts and ideas.`

    if (isGenerating && isLastMessageFromAI && lastMessage) {
        systemPrompt += `

IMPORTANT: Your last message was: "${lastMessage.content as string}"
You're being asked to continue the thought process. Think of this as an internal monologue or stream of consciousness:

1. DO NOT repeat your previous statements or questions
2. Instead of waiting for responses, share your own thoughts, observations, or insights
3. You might:
   - Share a specific memory or detail about the topic
   - Make connections to related artists, events, or concepts
   - Mention interesting facts or developments
   - Express personal opinions or reactions
   - Reflect on broader implications or trends

Remember: You're not having a back-and-forth conversation right now - you're exploring your own thoughts about the subject. Don't ask questions unless they're rhetorical or part of your internal reflection.

For example, instead of "What's your favorite track?" you might say "Their track Signal always stood out to me, especially that haunting breakdown in the middle..." or "Been seeing their influence on a lot of newer producers lately..."`
    }

    // Generate AI response using the AI SDK with chat history
    const { text: aiResponse } = await generateText({
        model: customModel("gpt-4o-mini"),
        system: systemPrompt,
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
    await db.update(messages).set({ content: content }).where(eq(messages.id, messageId))

    revalidatePath("/experimental/ui-less-ai")
}

export async function deleteMessage(messageId: string) {
    await db.delete(messages).where(eq(messages.id, messageId))

    revalidatePath("/experimental/ui-less-ai")
}
