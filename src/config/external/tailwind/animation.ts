/**
 *
 */

import type { ThemeConfig } from "tailwindcss/types/config"

export const animation = {
    "navigation-menu-enter": "enter 0.25s var(--ease-out)",
    "navigation-menu-exit": "exit 0.25s var(--ease-out)"

    // "caret-blink": "caret-blink 1.25s ease-out infinite"
} satisfies ThemeConfig["animation"]
