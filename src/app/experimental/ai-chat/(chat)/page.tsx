import { cookies } from "next/headers"

import { Chat } from "~/domains/ai-chat/components/chat"
import { DEFAULT_MODEL_NAME, models } from "~/domains/ai-chat/lib/ai/models"
import { generateUUID } from "~/domains/ai-chat/lib/utils"

export default async function Page() {
    const id = generateUUID()

    const cookieStore = await cookies()
    const modelIdFromCookie = cookieStore.get("model-id")?.value

    const selectedModelId = models.find(model => model.id === modelIdFromCookie)?.id ?? DEFAULT_MODEL_NAME

    return (
        <Chat
            key={id}
            id={id}
            initialMessages={[]}
            selectedModelId={selectedModelId}
            selectedVisibilityType="private"
            isReadonly={false}
        />
    )
}