/**
 *
 */

import { type Config } from "tailwindcss"
import animate from "tailwindcss-animate"
import {
    animation,
    backdropBlur,
    borderRadius,
    borderWidth,
    colors,
    fontFamily,
    fontSize,
    height,
    keyframes,
    transitionDuration,
    transitionProperty,
    transitionTimingFunction,
    width
} from "./src/config/external/tailwind"

export default {
    darkMode: ["class"],
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],

    theme: {
        fontFamily,
        fontSize,

        borderWidth,
        borderRadius,

        backdropBlur,
        extend: {
            width,
            height,

            transitionProperty,

            colors,

            transitionDuration,
            transitionTimingFunction,

            animation,
            keyframes
        }
    },

    plugins: [animate]
} satisfies Config
