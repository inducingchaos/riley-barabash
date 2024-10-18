/**
 *
 */

import type { ThemeConfig } from "tailwindcss/types/config"

export const borderWidth = {
    DEFAULT: "var(--border-width)",
    "2": "calc(var(--border-width) * 2)",
    "3": "calc(var(--border-width) * 3)",
    "4": "calc(var(--border-width) * 4)",
    "6": "calc(var(--border-width) * 6)",
    "8": "calc(var(--border-width) * 8)",
    "12": "calc(var(--border-width) * 12)",
    "16": "calc(var(--border-width) * 16)",
    "24": "calc(var(--border-width) * 24)",
    "32": "calc(var(--border-width) * 32)",

    "1!": "var(--border-width-force)",
    "2!": "calc(var(--border-width-force) * 2)",
    "3!": "calc(var(--border-width-force) * 3)",
    "4!": "calc(var(--border-width-force) * 4)",
    "6!": "calc(var(--border-width-force) * 6)",
    "8!": "calc(var(--border-width-force) * 8)",
    "12!": "calc(var(--border-width-force) * 12)",
    "16!": "calc(var(--border-width-force) * 16)",
    "24!": "calc(var(--border-width-force) * 24)",
    "32!": "calc(var(--border-width-force) * 32)",

    "/2": "calc(var(--border-width, initial) / 2)",
    "/3": "calc(var(--border-width, initial) / 3)",
    "/4": "calc(var(--border-width, initial) / 4)",

    "/2!": "calc(var(--border-width-force, initial) / 2)",
    "/3!": "calc(var(--border-width-force, initial) / 3)",
    "/4!": "calc(var(--border-width-force, initial) / 4)"
} satisfies ThemeConfig["borderWidth"]
