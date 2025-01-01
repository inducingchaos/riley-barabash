/**
 *
 */

import { Starter } from "~/components/ui/compositions/templates/starter"
import { TheMagicalComponent } from "./_components"
import { getMessages } from "./actions"

export default async function UILessAI(): Promise<JSX.Element> {
    const messages = (await getMessages()).map(m => ({
        id: m.id,
        content: m.content ?? "",
        createdAt: m.createdAt.toLocaleString(),
        role: m.role
    }))

    return (
        <Starter>
            <h1 className="pb-32px pt-64px text-32px font-bold">UI-Less AI</h1>

            {/* Messages area with padding bottom to prevent input overlap */}
            {/* <div className="flex-1 overflow-y-auto pb-20">
                <ul className="space-y-8px p-16px">
                    {messages.map(msg => (
                        <li key={msg.id} className="p-12px">
                            <p className="break-words">{msg.content}</p>
                            <span className="">{msg.createdAt}</span>
                        </li>
                    ))}
                </ul>
            </div> */}

            <TheMagicalComponent mostRecentMessage={messages[messages.length - 1]?.content ?? ""} messages={messages} />
        </Starter>
    )
}
