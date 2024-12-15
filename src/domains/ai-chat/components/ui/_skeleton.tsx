import { cn } from "~/domains/ai-chat/lib/utils"

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("rounded-md bg-main-sixteenth animate-pulse", className)} {...props} />
}

export { Skeleton }
