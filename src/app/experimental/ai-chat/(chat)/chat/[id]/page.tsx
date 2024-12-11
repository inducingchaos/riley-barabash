import { cookies } from "next/headers"
import { notFound } from "next/navigation"

// import { auth } from "~/app/experimental/ai-chat/_(auth)/auth"
import { Chat } from "~/domains/ai-chat/components/chat"
import { DEFAULT_MODEL_NAME, models } from "~/domains/ai-chat/lib/ai/models"
import { getChatById, getMessagesByChatId } from "~/domains/ai-chat/lib/db/queries"
import { convertToUIMessages } from "~/domains/ai-chat/lib/utils"

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params
    const { id } = params
    const chat = await getChatById({ id })

    if (!chat) {
        notFound()
    }

    // const session = await auth()

    /**
     * Temp.
     */
    const session = {
        user: {
            id: "0221"
        }
    }

    if (chat.visibility === "private") {
        if (!session?.user) {
            return notFound()
        }

        if (session.user.id !== chat.userId) {
            return notFound()
        }
    }

    const messagesFromDb = await getMessagesByChatId({
        id
    })

    const cookieStore = await cookies()
    const modelIdFromCookie = cookieStore.get("model-id")?.value
    const selectedModelId = models.find(model => model.id === modelIdFromCookie)?.id ?? DEFAULT_MODEL_NAME

    return (
        <Chat
            id={chat.id}
            initialMessages={convertToUIMessages(messagesFromDb)}
            selectedModelId={selectedModelId}
            selectedVisibilityType={chat.visibility}
            isReadonly={session?.user?.id !== chat.userId}
        />
    )
}
