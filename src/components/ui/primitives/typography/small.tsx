/**
 *
 */

import { cn } from "~/utils/ui"

export function Small({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }): JSX.Element {
    return (
        <small className={cn("text-14px font-medium leading-none", className)} {...props}>
            {children}
        </small>
    )
}
