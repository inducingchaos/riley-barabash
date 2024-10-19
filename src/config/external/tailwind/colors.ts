/**
 *
 */

import type { ThemeConfig } from "tailwindcss/types/config"

type Variant = string | [string, string]

const createColorVariants = ({ using: { name, variants } }: { using: { name: string; variants: readonly Variant[] } }) =>
    Object.fromEntries(
        variants.map(variant => {
            const isString = typeof variant === "string"

            const key = isString ? variant : variant[0]
            const value = isString ? variant : variant[1]

            return [key, `hsl(var(--color-${name}${key === "DEFAULT" ? "" : `-${value}`}))`]
        })
    )

const createColors = ({ using: { names, variants } }: { using: { names: readonly string[]; variants: readonly Variant[] } }) =>
    Object.fromEntries(names.map(name => [name, createColorVariants({ using: { name, variants } })]))

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

const variants = [
    "DEFAULT",
    "upper-sixteenth",
    "upper-eighth",
    "upper-quarter",
    "half",
    ["3/8", "three-eighths"],
    "quarter",
    "eighth",
    "sixteenth"
] as const satisfies Variant[]

export const colors = {
    ...createColors({ using: { names, variants } })

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
