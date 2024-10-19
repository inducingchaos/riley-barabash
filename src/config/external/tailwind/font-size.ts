/**
 *
 */

import { fontSize as defaultFontSize } from "tailwindcss/defaultTheme"
import type { ThemeConfig } from "tailwindcss/types/config"

export const fontSize = {
    "12": defaultFontSize.xs,
    "14": defaultFontSize.sm,
    base: defaultFontSize.base,
    "18": defaultFontSize.lg,
    "20": defaultFontSize.xl,
    "24": defaultFontSize["2xl"],
    "30": defaultFontSize["3xl"],
    "36": defaultFontSize["4xl"],
    "48": defaultFontSize["5xl"],
    "60": defaultFontSize["6xl"],
    "72": defaultFontSize["7xl"],
    "96": defaultFontSize["8xl"],
    "128": defaultFontSize["9xl"]
} satisfies ThemeConfig["fontSize"]
