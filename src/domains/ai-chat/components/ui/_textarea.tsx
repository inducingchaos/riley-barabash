import * as React from "react"

import { cn } from "~/domains/ai-chat/lib/utils"

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(({ className, ...props }, ref) => {
    return (
        <textarea
            className={cn(
                "rounded-md border-main-sixteenth bg-alternate ring-offset-background placeholder:text-main-half focus-visible:ring-accent-constant md:text-sm flex min-h-[80px] w-full border px-3 py-2 text-16 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            ref={ref}
            {...props}
        />
    )
})
Textarea.displayName = "Textarea"

export { Textarea }
