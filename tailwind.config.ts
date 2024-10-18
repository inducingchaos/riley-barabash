/**
 *
 */

import { type Config } from "tailwindcss"
import animate from "tailwindcss-animate"
import { fontFamily } from "tailwindcss/defaultTheme"
import { borderRadius, borderWidth, colors } from "./src/config/external/tailwind"

export default {
    darkMode: ["class"],
    content: ["./src/**/*.tsx"],

    theme: {
        fontFamily: {
            sans: ["var(--font-px-grotesk)", ...fontFamily.sans],
            mono: ["var(--font-px-grotesk-mono)", ...fontFamily.mono],
            serif: ["var(--font-hoefler-text)", ...fontFamily.serif],
            inter: ["var(--font-inter)", ...fontFamily.sans]
        },

        borderWidth,
        borderRadius,

        backdropBlur: {
            DEFAULT: "16px",
            thinner: "4px",
            thin: "8px",
            thick: "32px",
            thicker: "64px"
        },
        extend: {
            colors,

            transitionDuration: {
                "125": "125ms",
                "250": "250ms",
                "5000": "5000ms"
            },
            transitionTimingFunction: {
                out: "var(--ease-out-expo)",
                "in-out": "var(--ease-in-out-expo)"
            },

            animation: {
                "navigation-menu-enter": "enter 0.25s var(--ease-out-expo)",
                "navigation-menu-exit": "exit 0.25s var(--ease-out-expo)"

                // "caret-blink": "caret-blink 1.25s ease-out infinite"
            },
            keyframes: {
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
            }
        }
    },

    plugins: [animate]
} satisfies Config
