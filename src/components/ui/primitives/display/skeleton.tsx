/**
 *
 */

import { cn } from "~/utils/ui"

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("animate-pulse rounded-6px bg-accent-constant/eighth", className)} {...props} />
}

export { Skeleton }
