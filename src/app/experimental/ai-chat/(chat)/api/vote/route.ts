// import { auth } from "~/app/experimental/ai-chat/_(auth)/auth"
import { getVotesByChatId, voteMessage } from "~/domains/ai-chat/lib/db/queries"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const chatId = searchParams.get("chatId")

    if (!chatId) {
        return new Response("chatId is required", { status: 400 })
    }

    // const session = await auth()

    /**
     * Temp.
     */
    const session = {
        user: {
            id: "06b0daf6-e69a-406c-ae46-cc22d46b073c"
        }
    }

    if (!session?.user) {
        return new Response("Unauthorized", { status: 401 })
    }

    const votes = await getVotesByChatId({ id: chatId })

    return Response.json(votes, { status: 200 })
}

export async function PATCH(request: Request) {
    const { chatId, messageId, type } = (await request.json()) as {
        chatId: string
        messageId: string
        type: "up" | "down"
    }

    if (!chatId || !messageId || !type) {
        return new Response("messageId and type are required", { status: 400 })
    }

    // const session = await auth()

    /**
     * Temp.
     */
    const session = {
        user: {
            id: "06b0daf6-e69a-406c-ae46-cc22d46b073c"
        }
    }

    if (!session?.user) {
        return new Response("Unauthorized", { status: 401 })
    }

    await voteMessage({
        chatId,
        messageId,
        type: type
    })

    return new Response("Message voted", { status: 200 })
}
