/**
 * @file Gets the value of a CSS variable.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #utils
 * #ui
 * #css
 * #get-css-variable-value
 */

export function getCssVariableValue({ for: variableName }: { for: string }): string {
    return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim()
}
