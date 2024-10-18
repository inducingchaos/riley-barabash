/**
 *
 */

import type { ThemeConfig } from "tailwindcss/types/config"

export const colors = {
    main: {
        DEFAULT: "hsl(var(--color-main))",
        "upper-sixteenth": "hsl(var(--color-main-upper-sixteenth))",
        "upper-eighth": "hsl(var(--color-main-upper-eighth))",
        "upper-quarter": "hsl(var(--color-main-upper-quarter))",
        half: "hsl(var(--color-main-half))",
        "3/8": "hsl(var(--color-main-three-eighths))",
        quarter: "hsl(var(--color-main-quarter))",
        eighth: "hsl(var(--color-main-eighth))",
        sixteenth: "hsl(var(--color-main-sixteenth))"
    },
    neutral: {
        DEFAULT: "hsl(var(--color-neutral))",
        "upper-sixteenth": "hsl(var(--color-neutral-upper-sixteenth))",
        "upper-eighth": "hsl(var(--color-neutral-upper-eighth))",
        "upper-quarter": "hsl(var(--color-neutral-upper-quarter))",
        half: "hsl(var(--color-neutral-half))",
        "3/8": "hsl(var(--color-neutral-three-eighths))",
        quarter: "hsl(var(--color-neutral-quarter))",
        eighth: "hsl(var(--color-neutral-eighth))",
        sixteenth: "hsl(var(--color-neutral-sixteenth))"
    },
    alternate: {
        DEFAULT: "hsl(var(--color-alternate))",
        "upper-sixteenth": "hsl(var(--color-alternate-upper-sixteenth))",
        "upper-eighth": "hsl(var(--color-alternate-upper-eighth))",
        "upper-quarter": "hsl(var(--color-alternate-upper-quarter))",
        half: "hsl(var(--color-alternate-half))",
        "3/8": "hsl(var(--color-alternate-three-eighths))",
        quarter: "hsl(var(--color-alternate-quarter))",
        eighth: "hsl(var(--color-alternate-eighth))",
        sixteenth: "hsl(var(--color-alternate-sixteenth))"
    },

    accent: {
        DEFAULT: "hsl(var(--color-accent))",
        "upper-sixteenth": "hsl(var(--color-accent-upper-sixteenth))",
        "upper-eighth": "hsl(var(--color-accent-upper-eighth))",
        "upper-quarter": "hsl(var(--color-accent-upper-quarter))",
        half: "hsl(var(--color-accent-half))",
        "3/8": "hsl(var(--color-accent-three-eighths))",
        quarter: "hsl(var(--color-accent-quarter))",
        eighth: "hsl(var(--color-accent-eighth))",
        sixteenth: "hsl(var(--color-accent-sixteenth))"
    },
    "accent-neutral": {
        DEFAULT: "hsl(var(--color-accent-neutral))",
        "upper-sixteenth": "hsl(var(--color-accent-neutral-upper-sixteenth))",
        "upper-eighth": "hsl(var(--color-accent-neutral-upper-eighth))",
        "upper-quarter": "hsl(var(--color-accent-neutral-upper-quarter))",
        half: "hsl(var(--color-accent-neutral-half))",
        "3/8": "hsl(var(--color-accent-neutral-three-eighths))",
        quarter: "hsl(var(--color-accent-neutral-quarter))",
        eighth: "hsl(var(--color-accent-neutral-eighth))",
        sixteenth: "hsl(var(--color-accent-neutral-sixteenth))"
    },
    "accent-alternate": {
        DEFAULT: "hsl(var(--color-accent-alternate))",
        "upper-sixteenth": "hsl(var(--color-accent-alternate-upper-sixteenth))",
        "upper-eighth": "hsl(var(--color-accent-alternate-upper-eighth))",
        "upper-quarter": "hsl(var(--color-accent-alternate-upper-quarter))",
        half: "hsl(var(--color-accent-alternate-half))",
        "3/8": "hsl(var(--color-accent-alternate-three-eighths))",
        quarter: "hsl(var(--color-accent-alternate-quarter))",
        eighth: "hsl(var(--color-accent-alternate-eighth))",
        sixteenth: "hsl(var(--color-accent-alternate-sixteenth))"
    }

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
