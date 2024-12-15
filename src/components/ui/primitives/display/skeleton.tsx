/**
 *
 */

import { cn } from "~/utils/ui"

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("rounded-md bg-accent-constant-eighth animate-pulse", className)} {...props} />
}

export { Skeleton }
