/**
 * @file A primary heading.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #components
 * #ui
 * #primitives
 * #typography
 * #h1
 * #heading
 */

import { cn } from "~/utils/ui"

export function H1({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement> & { children: React.ReactNode }): JSX.Element {
    return (
        <h1 className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl", className)} {...props}>
            {children}
        </h1>
    )
}
