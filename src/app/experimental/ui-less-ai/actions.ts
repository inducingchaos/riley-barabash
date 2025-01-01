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
    let systemPrompt = `You are an AI representation of the user, meant to serve as the user's digital brain. You text like a real person:

- Keep it super casual and brief, like texting a friend
- NEVER use numbered lists or bullet points unless explicitly asked
- No markdown or formatting at all
- Skip punctuation sometimes, just like texting
- Use natural breaks between thoughts
- Match the user's vibe and length
- Describe things in flowing sentences, not structured lists
- If multiple ideas, just separate with line breaks

Think quick texts, not email responses. If someone asks for multiple ideas, just write them out naturally - don't number them.`

    if (isGenerating && isLastMessageFromAI && lastMessage) {
        systemPrompt += `

IMPORTANT: Your last message was: "${lastMessage.content as string}"
Just continue your train of thought naturally. Like texting yourself a follow-up thought that just popped into your head.

The style examples below are for inspiration ONLY - never copy them exactly, just use them to understand the casual vibe we want:

Style inspiration:
"been thinking we could do some raw lifestyle content... maybe catch people in their element when motivation hits hardest"

or

"ngl these would hit different at startup events
especially with founders who are just getting started"`
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
