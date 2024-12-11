import { cn } from "~/domains/ai-chat/lib/utils"

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("rounded-md bg-muted animate-pulse", className)} {...props} />
}

export { Skeleton }
