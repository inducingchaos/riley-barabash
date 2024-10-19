/**
 *
 */

import { cn } from "~/utils/ui"
import type { StackOptions } from "./base"

export function ZStack({ children, className }: Omit<StackOptions, "orientation">): JSX.Element {
    return <div className={cn("relative", className)}>{children}</div>
}
