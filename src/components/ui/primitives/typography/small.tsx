/**
 * @file A small typography element.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #components
 * #ui
 * #primitives
 * #typography
 * #small
 */

import { cn } from "~/utils/ui"

export function Small({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }): JSX.Element {
    return <small className={cn("text-sm font-medium leading-none", className)} {...props}>{children}</small>
}
