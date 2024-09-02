/**
 * @file A large typography element.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #components
 * #ui
 * #primitives
 * #typography
 * #large
 */

import { cn } from "~/utils/ui"

export function Large({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }): JSX.Element {
    return <div className={cn("text-lg font-semibold", className)} {...props}>{children}</div>
}
