// import { auth } from "~/app/experimental/ai-chat/_(auth)/auth"
import { getChatsByUserId } from "~/domains/ai-chat/lib/db/queries"

export async function GET() {
    // const session = await auth()

    /**
     * Temp.
     */
    const session = {
        user: {
            id: "0221"
        }
    }

    if (!session?.user) {
        return Response.json("Unauthorized!", { status: 401 })
    }

    const chats = await getChatsByUserId({ id: session.user.id })

    return Response.json(chats)
}
