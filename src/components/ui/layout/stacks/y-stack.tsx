/**
 *
 */

import { Stack, type StackOptions } from "."

export function YStack(options: Omit<StackOptions, "orientation">) {
    return <Stack {...options} orientation="vertical" />
}
