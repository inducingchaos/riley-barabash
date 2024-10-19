/**
 *
 */

import type { ThemeConfig } from "tailwindcss/types/config"

export const keyframes = {
    enter: {
        from: { transform: "scale(0.875)", opacity: "0" },
        to: { transform: "scale(1)", opacity: "1" }
    },
    exit: {
        from: { transform: "scale(1)", opacity: "1" },
        to: { transform: "scale(0.875)", opacity: "0" }
    }

    // "caret-blink": {
    //     "0%,70%,100%": { opacity: "1" },
    //     "20%,50%": { opacity: "0" }
    // },
    // shimmer: {
    //     "100%": {
    //         transform: "translateX(100%)"
    //     }
    // }
} satisfies ThemeConfig["keyframes"]
