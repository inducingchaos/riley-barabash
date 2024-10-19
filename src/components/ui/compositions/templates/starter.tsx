/**
 *
 */

import { XStack, YStack, type StackOptions } from "~/components/ui/layout/stacks"
import { cn } from "~/utils/ui"

export function Starter({ children, className, ...options }: StackOptions): JSX.Element {
    return (
        <YStack label="Starter" type="main">
            <XStack label="Container" className="container">
                <YStack label="Content" type="section" className={cn("min-h-screen", className)} {...options}>
                    {children ?? <p>Hello, world!</p>}
                </YStack>
            </XStack>
        </YStack>
    )
}
