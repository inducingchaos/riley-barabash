// import { auth } from "~/app/experimental/ai-chat/_(auth)/auth"
import { getSuggestionsByDocumentId } from "~/domains/ai-chat/lib/db/queries"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const documentId = searchParams.get("documentId")

    if (!documentId) {
        return new Response("Not Found", { status: 404 })
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

    if (!session?.user) {
        return new Response("Unauthorized", { status: 401 })
    }

    const suggestions = await getSuggestionsByDocumentId({
        documentId
    })

    const [suggestion] = suggestions

    if (!suggestion) {
        return Response.json([], { status: 200 })
    }

    if (suggestion.userId !== session.user.id) {
        return new Response("Unauthorized", { status: 401 })
    }

    return Response.json(suggestions, { status: 200 })
}
