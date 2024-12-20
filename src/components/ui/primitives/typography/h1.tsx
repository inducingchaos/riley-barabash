/**
 *
 */

import { cn } from "~/utils/ui"

export function H1({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLHeadingElement> & { children: React.ReactNode }): JSX.Element {
    return (
        // was scroll-m-20
        <h1 className={cn("scroll-m-96px text-36px font-bold tracking-tight lg:text-48px", className)} {...props}>
            {children}
        </h1>
    )
}
