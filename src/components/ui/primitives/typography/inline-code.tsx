/**
 *
 */

import { cn } from "~/utils/ui"

export function InlineCode({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLSpanElement> & { children: React.ReactNode }): JSX.Element {
    return (
        <code
            className={cn("relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold", className)}
            {...props}
        >
            {children}
        </code>
    )
}
