/**
 *
 */

import type { ThemeConfig } from "tailwindcss/types/config"

const createOpacityVariants = ({
    using: { name: colorName, variants: opacityVariants }
}: {
    using: { name: string; variants: Record<string, number> }
}) =>
    Object.fromEntries(
        Object.entries(opacityVariants).map(([variantName, opacity]) => [
            variantName,
            `hsl(var(--color-${colorName}) / ${opacity}%)`
        ])
    )

const createColorsWithOpacityVariants = ({
    using: { names: colorNames, variants: opacityVariants }
}: {
    using: { names: readonly string[]; variants: Record<string, number> }
}) =>
    Object.fromEntries(
        colorNames.map(colorName => [
            colorName,
            createOpacityVariants({ using: { name: colorName, variants: opacityVariants } })
        ])
    )

const names = [
    "main",
    "main-constant",
    "neutral",
    "alternate",
    "alternate-constant",

    "warning",
    "danger",
    "success",
    "info",

    "accent",
    "accent-constant",
    "accent-neutral",
    "accent-alternate",
    "accent-alternate-constant"
] as const

const opacityVariants = {
    DEFAULT: 100,
    "upper-sixteenth": 93.75,
    "upper-eighth": 87.5,
    "upper-quarter": 75,
    half: 50,
    "3/8": 37.5,
    quarter: 25,
    "3/16": 18.75,
    eighth: 12.5,
    "3/32": 9.375,
    sixteenth: 6.25,
    "thirty-second": 3.125,
    zero: 0
} as const satisfies Record<string, number>

export const colors = {
    ...createColorsWithOpacityVariants({ using: { names, variants: opacityVariants } })
} satisfies ThemeConfig["colors"]
