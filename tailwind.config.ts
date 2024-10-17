/**
 *
 */

import { type Config } from "tailwindcss"
import animate from "tailwindcss-animate"
import { fontFamily } from "tailwindcss/defaultTheme"

export default {
    darkMode: ["class"],
    content: ["./src/**/*.tsx"],
    theme: {
        backdropBlur: {
            DEFAULT: "16px",
            thin: "8px",
            thick: "32px"
        },
        extend: {
            fontFamily: {
                sans: ["var(--font-px-grotesk)", ...fontFamily.sans],
                mono: ["var(--font-px-grotesk-mono)", ...fontFamily.mono],
                serif: ["var(--font-hoefler-text)", ...fontFamily.serif],
                inter: ["var(--font-inter)", ...fontFamily.sans]
            },
            transitionTimingFunction: {
                "out-expo": "var(--ease-out-expo)",
                "in-out-expo": "var(--ease-in-out-expo)"
            },
            transitionDuration: {
                "5000": "5000ms"
            },
            // borderRadius: {
            //     lg: "var(--border-radius)",
            //     md: "calc(var(--border-radius) - 2px)",
            //     sm: "calc(var(--border-radius) - 4px)"
            // },
            colors: {
                main: {
                    DEFAULT: "hsl(var(--main))",
                    "upper-sixteenth": "hsl(var(--main-upper-sixteenth))",
                    "upper-eighth": "hsl(var(--main-upper-eighth))",
                    "upper-quarter": "hsl(var(--main-upper-quarter))",
                    half: "hsl(var(--main-half))",
                    quarter: "hsl(var(--main-quarter))",
                    eighth: "hsl(var(--main-eighth))",
                    sixteenth: "hsl(var(--main-sixteenth))"
                },
                inverse: {
                    DEFAULT: "hsl(var(--inverse))",
                    "upper-sixteenth": "hsl(var(--inverse-upper-sixteenth))",
                    "upper-eighth": "hsl(var(--inverse-upper-eighth))",
                    "upper-quarter": "hsl(var(--inverse-upper-quarter))",
                    half: "hsl(var(--inverse-half))",
                    quarter: "hsl(var(--inverse-quarter))",
                    eighth: "hsl(var(--inverse-eighth))",
                    sixteenth: "hsl(var(--inverse-sixteenth))"
                },
                neutral: {
                    DEFAULT: "hsl(var(--neutral))",
                    "upper-sixteenth": "hsl(var(--neutral-upper-sixteenth))",
                    "upper-eighth": "hsl(var(--neutral-upper-eighth))",
                    "upper-quarter": "hsl(var(--neutral-upper-quarter))",
                    half: "hsl(var(--neutral-half))",
                    quarter: "hsl(var(--neutral-quarter))",
                    eighth: "hsl(var(--neutral-eighth))",
                    sixteenth: "hsl(var(--neutral-sixteenth))"
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    "upper-sixteenth": "hsl(var(--accent-upper-sixteenth))",
                    "upper-eighth": "hsl(var(--accent-upper-eighth))",
                    "upper-quarter": "hsl(var(--accent-upper-quarter))",
                    half: "hsl(var(--accent-half))",
                    quarter: "hsl(var(--accent-quarter))",
                    eighth: "hsl(var(--accent-eighth))",
                    sixteenth: "hsl(var(--accent-sixteenth))"
                },

                background: {
                    DEFAULT: "hsl(var(--background))",
                    secondary: "hsl(var(--background-secondary))"
                },
                text: {
                    DEFAULT: "hsl(var(--text))",
                    secondary: "hsl(var(--text-secondary))",
                    tertiary: "hsl(var(--text-tertiary))"
                },
                border: "hsl(var(--border))"

                // card: {
                //     DEFAULT: "hsl(var(--card))",
                //     foreground: "hsl(var(--card-foreground))"
                // },
                // popover: {
                //     DEFAULT: "hsl(var(--popover))",
                //     foreground: "hsl(var(--popover-foreground))"
                // },
                // primary: {
                //     DEFAULT: "hsl(var(--primary))",
                //     foreground: "hsl(var(--primary-foreground))"
                // },
                // secondary: {
                //     DEFAULT: "hsl(var(--secondary))",
                //     foreground: "hsl(var(--secondary-foreground))"
                // },
                // muted: {
                //     DEFAULT: "hsl(var(--muted))",
                //     foreground: "hsl(var(--muted-foreground))"
                // },
                // accent: {
                //     DEFAULT: "hsl(var(--accent))",
                //     foreground: "hsl(var(--accent-foreground))"
                // },
                // destructive: {
                //     DEFAULT: "hsl(var(--destructive))",
                //     foreground: "hsl(var(--destructive-foreground))"
                // },
                // input: "hsl(var(--input))",
                // ring: "hsl(var(--ring))",
                // chart: {
                //     "1": "hsl(var(--chart-1))",
                //     "2": "hsl(var(--chart-2))",
                //     "3": "hsl(var(--chart-3))",
                //     "4": "hsl(var(--chart-4))",
                //     "5": "hsl(var(--chart-5))"
                // }
            },
            borderWidth: {
                DEFAULT: "var(--border-width)",
                1: "0.0625em"
            },
            keyframes: {
                "caret-blink": {
                    "0%,70%,100%": { opacity: "1" },
                    "20%,50%": { opacity: "0" }
                },
                shimmer: {
                    "100%": {
                        transform: "translateX(100%)"
                    }
                },
                enter: {
                    "0%": { transform: "scale(0.875)", opacity: "0" },
                    "100%": { transform: "scale(1)", opacity: "1" }
                },
                exit: {
                    "0%": { transform: "scale(1)", opacity: "1" },
                    "100%": { transform: "scale(0.875)", opacity: "0" }
                }
            },
            animation: {
                "caret-blink": "caret-blink 1.25s ease-out infinite",
                "in-custom": "enter 0.25s var(--ease-out-expo)",
                "out-custom": "exit 0.25s var(--ease-out-expo)"
            }
        }
    },

    plugins: [animate]
} satisfies Config
