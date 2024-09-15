/**
 *
 */

export function getCssVariableValue({ for: variableName }: { for: string }): string {
    return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim()
}
