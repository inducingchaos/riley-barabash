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
    "neutral",
    "alternate",

    "warning",
    "danger",
    "success",
    "info",

    "accent",
    "accent-neutral",
    "accent-alternate"
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
    "thirty-second": 3.125
} as const satisfies Record<string, number>

export const colors = {
    ...createColorsWithOpacityVariants({ using: { names, variants: opacityVariants } })

    // card: {
    //     DEFAULT: "hsl(var(--card))",
    //     foreground: "hsl(var(--card-foreground))"
    // },
    // popover: {
    //     DEFAULT: "hsl(var(--popover))",
    //     foreground: "hsl(var(--popover-foreground))"
    // },
    // primary: {
    //     DEFAULT: "hsl(var(--primary))",
    //     foreground: "hsl(var(--primary-foreground))"
    // },
    // secondary: {
    //     DEFAULT: "hsl(var(--secondary))",
    //     foreground: "hsl(var(--secondary-foreground))"
    // },
    // muted: {
    //     DEFAULT: "hsl(var(--muted))",
    //     foreground: "hsl(var(--muted-foreground))"
    // },
    // accent: {
    //     DEFAULT: "hsl(var(--accent))",
    //     foreground: "hsl(var(--accent-foreground))"
    // },
    // destructive: {
    //     DEFAULT: "hsl(var(--destructive))",
    //     foreground: "hsl(var(--destructive-foreground))"
    // },
    // input: "hsl(var(--input))",
    // ring: "hsl(var(--ring))",
    // chart: {
    //     "1": "hsl(var(--chart-1))",
    //     "2": "hsl(var(--chart-2))",
    //     "3": "hsl(var(--chart-3))",
    //     "4": "hsl(var(--chart-4))",
    //     "5": "hsl(var(--chart-5))"
    // }
} satisfies ThemeConfig["colors"]
