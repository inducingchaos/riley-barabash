/**
 * @file A configuration for Tailwind.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #tailwind
 * #config
 */

import { type Config } from "tailwindcss"
import { fontFamily } from "tailwindcss/defaultTheme"

export default {
    darkMode: ["class"],
    content: ["./src/**/*.tsx"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-px-grotesk)", ...fontFamily.sans],
                mono: ["var(--font-px-grotesk-mono)", ...fontFamily.mono],
                screen: ["var(--font-px-grotesk-screen)", ...fontFamily.serif],
                inter: ["var(--font-inter)", ...fontFamily.sans]
            },
            transitionTimingFunction: {
                "ease-out-expo": "cubic-bezier(0.125, 1.0, 0.25, 1.0)",
                "ease-in-out-expo": "cubic-bezier(0.875, 0.0, 0.125, 1.0)"
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)"
            },
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))"
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))"
                },
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))"
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))"
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))"
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))"
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))"
                },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                chart: {
                    "1": "hsl(var(--chart-1))",
                    "2": "hsl(var(--chart-2))",
                    "3": "hsl(var(--chart-3))",
                    "4": "hsl(var(--chart-4))",
                    "5": "hsl(var(--chart-5))"
                }
            }
        }
    },

    plugins: [require("tailwindcss-animate")]
} satisfies Config