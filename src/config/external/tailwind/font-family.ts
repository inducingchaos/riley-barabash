/**
 *
 */

import type { ThemeConfig } from "tailwindcss/types/config"
import defaultTheme from "tailwindcss/defaultTheme"

export const fontFamily = {
    sans: ["var(--font-px-grotesk)", ...defaultTheme.fontFamily.sans],
    mono: ["var(--font-px-grotesk-mono)", ...defaultTheme.fontFamily.mono],
    serif: ["var(--font-hoefler-text)", ...defaultTheme.fontFamily.serif],
    saans: ["var(--font-saans)", ...defaultTheme.fontFamily.sans],
    inter: ["var(--font-inter)", ...defaultTheme.fontFamily.sans]
} satisfies ThemeConfig["fontFamily"]
