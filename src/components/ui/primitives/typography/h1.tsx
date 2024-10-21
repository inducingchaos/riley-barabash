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
        <h1 className={cn("scroll-m-20 text-36 font-bold tracking-tight lg:text-48", className)} {...props}>
            {children}
        </h1>
    )
}
