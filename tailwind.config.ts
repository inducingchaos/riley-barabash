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
                inter: ["var(--font-inter)", ...fontFamily.sans]
            },
            transitionTimingFunction: {
                "ease-out-expo": "cubic-bezier(0.125, 1.0, 0.25, 1.0)",
                "ease-in-out-expo": "cubic-bezier(0.875, 0.0, 0.125, 1.0)"
            }
        }
    },

    plugins: []
} satisfies Config
