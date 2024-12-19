/**
 *
 */

import defaultTheme from "tailwindcss/defaultTheme"
import type { ThemeConfig } from "tailwindcss/types/config"

export const fontSize = {
    "12px": defaultTheme.fontSize.xs,
    "14px": defaultTheme.fontSize.sm,
    "16px": defaultTheme.fontSize.base,
    "18px": defaultTheme.fontSize.lg,
    "20px": defaultTheme.fontSize.xl,
    "24px": defaultTheme.fontSize["2xl"],
    "30px": defaultTheme.fontSize["3xl"],
    "32px": "2rem",
    "36px": defaultTheme.fontSize["4xl"],
    "48px": defaultTheme.fontSize["5xl"],
    "60px": defaultTheme.fontSize["6xl"],
    "64px": "4rem",
    "72px": defaultTheme.fontSize["7xl"],
    "96px": defaultTheme.fontSize["8xl"],
    "128px": defaultTheme.fontSize["9xl"]
} satisfies ThemeConfig["fontSize"]
