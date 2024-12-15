import { memo, type SetStateAction } from "react"

import type { UIBlock } from "./block"
import { FileIcon, LoaderIcon, MessageIcon, PencilEditIcon } from "./icons"
import { toast } from "sonner"

const getActionText = (type: "create" | "update" | "request-suggestions", tense: "present" | "past") => {
    switch (type) {
        case "create":
            return tense === "present" ? "Creating" : "Created"
        case "update":
            return tense === "present" ? "Updating" : "Updated"
        case "request-suggestions":
            return tense === "present" ? "Adding suggestions" : "Added suggestions to"
        default:
            return null
    }
}

type DocumentToolResultProps = {
    type: "create" | "update" | "request-suggestions"
    result: { id: string; title: string }
    block: UIBlock
    setBlock: (value: SetStateAction<UIBlock>) => void
    isReadonly: boolean
}

function PureDocumentToolResult({ type, result, setBlock, isReadonly }: DocumentToolResultProps) {
    return (
        <button
            type="button"
            className="bg-alternate rounded-xl flex w-fit cursor-pointer flex-row items-start gap-3 border px-3 py-2"
            onClick={event => {
                if (isReadonly) {
                    toast.error("Viewing files in shared chats is currently not supported.")
                    return
                }

                const rect = event.currentTarget.getBoundingClientRect()

                const boundingBox = {
                    top: rect.top,
                    left: rect.left,
                    width: rect.width,
                    height: rect.height
                }

                setBlock({
                    documentId: result.id,
                    content: "",
                    title: result.title,
                    isVisible: true,
                    status: "idle",
                    boundingBox
                })
            }}
        >
            <div className="text-main-half mt-1">
                {type === "create" ? (
                    <FileIcon />
                ) : type === "update" ? (
                    <PencilEditIcon />
                ) : type === "request-suggestions" ? (
                    <MessageIcon />
                ) : null}
            </div>
            <div className="text-left">{`${getActionText(type, "past")} "${result.title}"`}</div>
        </button>
    )
}

export const DocumentToolResult = memo(PureDocumentToolResult, () => true)

type DocumentToolCallProps = {
    type: "create" | "update" | "request-suggestions"
    args: { title: string }
    setBlock: (value: SetStateAction<UIBlock>) => void
    isReadonly: boolean
}

function PureDocumentToolCall({ type, args, setBlock, isReadonly }: DocumentToolCallProps) {
    return (
        <button
            type="button"
            className="cursor pointer rounded-xl flex w-fit flex-row items-start justify-between gap-3 border px-3 py-2"
            onClick={event => {
                if (isReadonly) {
                    toast.error("Viewing files in shared chats is currently not supported.")
                    return
                }

                const rect = event.currentTarget.getBoundingClientRect()

                const boundingBox = {
                    top: rect.top,
                    left: rect.left,
                    width: rect.width,
                    height: rect.height
                }

                setBlock(currentBlock => ({
                    ...currentBlock,
                    isVisible: true,
                    boundingBox
                }))
            }}
        >
            <div className="flex flex-row items-start gap-3">
                <div className="mt-1 text-zinc-500">
                    {type === "create" ? (
                        <FileIcon />
                    ) : type === "update" ? (
                        <PencilEditIcon />
                    ) : type === "request-suggestions" ? (
                        <MessageIcon />
                    ) : null}
                </div>

                <div className="text-left">{`${getActionText(type, "present")} ${args.title ? `"${args.title}"` : ""}`}</div>
            </div>

            <div className="mt-1 animate-spin">{<LoaderIcon />}</div>
        </button>
    )
}

export const DocumentToolCall = memo(PureDocumentToolCall, () => true)
