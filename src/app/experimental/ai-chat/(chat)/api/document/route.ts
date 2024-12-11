// import { auth } from "~/app/experimental/ai-chat/_(auth)/auth"
import { deleteDocumentsByIdAfterTimestamp, getDocumentsById, saveDocument } from "~/domains/ai-chat/lib/db/queries"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
        return new Response("Missing id", { status: 400 })
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

    const documents = await getDocumentsById({ id })

    const [document] = documents

    if (!document) {
        return new Response("Not Found", { status: 404 })
    }

    if (document.userId !== session.user.id) {
        return new Response("Unauthorized", { status: 401 })
    }

    return Response.json(documents, { status: 200 })
}

export async function POST(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
        return new Response("Missing id", { status: 400 })
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

    const { content, title } = (await request.json()) as { content: string; title: string }

    if (session.user?.id) {
        const document = await saveDocument({
            id,
            content,
            title,
            userId: session.user.id
        })

        return Response.json(document, { status: 200 })
    }
    return new Response("Unauthorized", { status: 401 })
}

export async function PATCH(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    const { timestamp } = (await request.json()) as { timestamp: string }

    if (!id) {
        return new Response("Missing id", { status: 400 })
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

    const documents = await getDocumentsById({ id })

    const [document] = documents

    if (document?.userId !== session.user.id) {
        return new Response("Unauthorized", { status: 401 })
    }

    await deleteDocumentsByIdAfterTimestamp({
        id,
        timestamp: new Date(timestamp)
    })

    return new Response("Deleted", { status: 200 })
}
