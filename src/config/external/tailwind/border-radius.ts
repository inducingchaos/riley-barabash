/**
 * 
 */

import type { ThemeConfig } from "tailwindcss/types/config";

export const borderRadius = {
    DEFAULT: "var(--border-radius)",
    "2": "calc(var(--border-radius, initial) * 2)",
    "3": "calc(var(--border-radius, initial) * 3)",
    "4": "calc(var(--border-radius, initial) * 4)",
    "6": "calc(var(--border-radius, initial) * 6)",
    "8": "calc(var(--border-radius, initial) * 8)",
    "12": "calc(var(--border-radius, initial) * 12)",
    "16": "calc(var(--border-radius, initial) * 16)",
    "24": "calc(var(--border-radius, initial) * 24)",
    "32": "calc(var(--border-radius, initial) * 32)",
    "48": "calc(var(--border-radius, initial) * 48)",
    "64": "calc(var(--border-radius, initial) * 64)",

    "1!": "var(--border-radius-force)",
    "2!": "calc(var(--border-radius-force) * 2)",
    "3!": "calc(var(--border-radius-force) * 3)",
    "4!": "calc(var(--border-radius-force) * 4)",
    "6!": "calc(var(--border-radius-force) * 6)",
    "8!": "calc(var(--border-radius-force) * 8)",
    "12!": "calc(var(--border-radius-force) * 12)",
    "16!": "calc(var(--border-radius-force) * 16)",
    "24!": "calc(var(--border-radius-force) * 24)",
    "32!": "calc(var(--border-radius-force) * 32)",
    "48!": "calc(var(--border-radius-force) * 48)",
    "64!": "calc(var(--border-radius-force) * 64)",

    "/2": "calc(var(--border-radius, initial) / 2)",
    "/3": "calc(var(--border-radius, initial) / 3)",
    "/4": "calc(var(--border-radius, initial) / 4)",
    "/6": "calc(var(--border-radius, initial) / 6)",
    "/8": "calc(var(--border-radius, initial) / 8)",
    "/12": "calc(var(--border-radius, initial) / 12)",
    "/16": "calc(var(--border-radius, initial) / 16)",

    "/2!": "calc(var(--border-radius-force) / 2)",
    "/3!": "calc(var(--border-radius-force) / 3)",
    "/4!": "calc(var(--border-radius-force) / 4)",
    "/6!": "calc(var(--border-radius-force) / 6)",
    "/8!": "calc(var(--border-radius-force) / 8)",
    "/12!": "calc(var(--border-radius-force) / 12)",
    "/16!": "calc(var(--border-radius-force) / 16)"
} satisfies ThemeConfig["borderRadius"]