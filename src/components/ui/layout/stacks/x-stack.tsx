/**
 *
 */

import { Stack, type StackOptions } from "."

export function XStack(options: Omit<StackOptions, "orientation">) {
    return <Stack {...options} orientation="horizontal" />
}
