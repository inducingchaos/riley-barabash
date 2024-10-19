/**
 *
 */

import type { ThemeConfig } from "tailwindcss/types/config"
import defaultTheme from "tailwindcss/defaultTheme"

export const borderRadius = {
    full: defaultTheme.borderRadius.full,
    none: defaultTheme.borderRadius.none,

    DEFAULT: "var(--border-radius)" /* 0.25rem recommended - replaces "rounded" */,
    "1.5": "calc(var(--border-radius, initial) * 1.5)" /* 6px scale, replaces "rounded-md" */,
    "2": "calc(var(--border-radius, initial) * 2)" /* 8px scale, replaces "rounded-lg" */,
    "3": "calc(var(--border-radius, initial) * 3)" /* 12px scale, replaces "rounded-xl" */,
    "4": "calc(var(--border-radius, initial) * 4)" /* 16px scale, replaces "rounded-2xl" */,
    "6": "calc(var(--border-radius, initial) * 6)" /* 24px scale, replaces "rounded-3xl" */,
    "8": "calc(var(--border-radius, initial) * 8)" /* 32px scale */,
    "12": "calc(var(--border-radius, initial) * 12)" /* 48px scale */,
    "16": "calc(var(--border-radius, initial) * 16)" /* 64px scale */,
    "24": "calc(var(--border-radius, initial) * 24)" /* 96px scale */,
    "32": "calc(var(--border-radius, initial) * 32)" /* 128px scale */,
    "48": "calc(var(--border-radius, initial) * 48)" /* 192px scale */,
    "64": "calc(var(--border-radius, initial) * 64)" /* 256px scale */,

    "1!": "var(--border-radius-force)" /* 0.25rem recommended - replaces "rounded" */,
    "1.5!": "calc(var(--border-radius-force) * 1.5)" /* 6px scale, replaces "rounded-md" */,
    "2!": "calc(var(--border-radius-force) * 2)" /* 8px scale, replaces "rounded-lg" */,
    "3!": "calc(var(--border-radius-force) * 3)" /* 12px scale, replaces "rounded-xl" */,
    "4!": "calc(var(--border-radius-force) * 4)" /* 16px scale, replaces "rounded-2xl" */,
    "6!": "calc(var(--border-radius-force) * 6)" /* 24px scale, replaces "rounded-3xl" */,
    "8!": "calc(var(--border-radius-force) * 8)" /* 32px scale */,
    "12!": "calc(var(--border-radius-force) * 12)" /* 48px scale */,
    "16!": "calc(var(--border-radius-force) * 16)" /* 64px scale */,
    "24!": "calc(var(--border-radius-force) * 24)" /* 96px scale */,
    "32!": "calc(var(--border-radius-force) * 32)" /* 128px scale */,
    "48!": "calc(var(--border-radius-force) * 48)" /* 192px scale */,
    "64!": "calc(var(--border-radius-force) * 64)" /* 256px scale */,

    "/2": "calc(var(--border-radius, initial) / 2)" /* 2px scale, replaces "rounded-sm" */,
    "/3": "calc(var(--border-radius, initial) / 3)",
    "/4": "calc(var(--border-radius, initial) / 4)" /* 1px scale */,
    "/6": "calc(var(--border-radius, initial) / 6)",
    "/8": "calc(var(--border-radius, initial) / 8)" /* 0.5px scale */,
    "/12": "calc(var(--border-radius, initial) / 12)",
    "/16": "calc(var(--border-radius, initial) / 16)" /* 0.25px scale */,

    "/2!": "calc(var(--border-radius-force) / 2)" /* 2px scale, replaces "rounded-sm" */,
    "/3!": "calc(var(--border-radius-force) / 3)",
    "/4!": "calc(var(--border-radius-force) / 4)" /* 1px scale */,
    "/6!": "calc(var(--border-radius-force) / 6)",
    "/8!": "calc(var(--border-radius-force) / 8)" /* 0.5px scale */,
    "/12!": "calc(var(--border-radius-force) / 12)",
    "/16!": "calc(var(--border-radius-force) / 16)" /* 0.25px scale */
} satisfies ThemeConfig["borderRadius"]
