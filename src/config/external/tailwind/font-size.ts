/**
 *
 */

import defaultTheme from "tailwindcss/defaultTheme"
import type { ThemeConfig } from "tailwindcss/types/config"

export const fontSize = {
    "12": defaultTheme.fontSize.xs,
    "14": defaultTheme.fontSize.sm,
    "16": defaultTheme.fontSize.base,
    "18": defaultTheme.fontSize.lg,
    "20": defaultTheme.fontSize.xl,
    "24": defaultTheme.fontSize["2xl"],
    "30": defaultTheme.fontSize["3xl"],
    "32": "2rem",
    "36": defaultTheme.fontSize["4xl"],
    "48": defaultTheme.fontSize["5xl"],
    "60": defaultTheme.fontSize["6xl"],
    "64": "4rem",
    "72": defaultTheme.fontSize["7xl"],
    "96": defaultTheme.fontSize["8xl"],
    "128": defaultTheme.fontSize["9xl"]
} satisfies ThemeConfig["fontSize"]
