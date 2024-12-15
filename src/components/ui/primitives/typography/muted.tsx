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
        <p className={cn("text-main-half text-14", className)} {...props}>
            {children}
        </p>
    )
}
