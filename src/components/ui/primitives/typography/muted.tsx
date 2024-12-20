/**
 *
 */

import { cn } from "~/utils/ui"

export function Muted({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }): JSX.Element {
    return (
        <p className={cn("text-14px text-main/half", className)} {...props}>
            {children}
        </p>
    )
}
