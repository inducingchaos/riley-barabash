/**
 *
 */

"use client"

import { useEffect, useRef } from "react"
import { Stack } from "~/components/ui/layout/stacks"
import { Button } from "~/components/ui/primitives/inputs/button"

export default function TheBoxClient() {
    return (
        <Stack className="w-384px">
            <form className="flex gap-2">
                <ExpandingTextarea />
                <Button onClick={() => console.log("clicked")} className="self-stretch">
                    {">"}
                </Button>
            </form>
        </Stack>
    )
}

export function ExpandingTextarea() {
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const adjustHeight = () => {
        const textarea = textareaRef.current
        if (!textarea) return
        textarea.style.height = "auto"
        textarea.style.height = `${textarea.scrollHeight + 2}px`
    }

    useEffect(() => {
        adjustHeight()
    }, [])

    return (
        <textarea
            ref={textareaRef}
            onChange={adjustHeight}
            className="max-h-[75vh] min-h-[24px] w-full resize-none overflow-hidden border px-4 py-2 placeholder:text-main-half focus:outline-none"
            placeholder="Your next thought..."
            rows={1}
        />
    )
}
