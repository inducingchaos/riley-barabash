/**
 * @see [Default TWMerge Config](https://github.com/dcastil/tailwind-merge/blob/v2.3.0/src/lib/default-config.ts)
 */

import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"
import {
    animation,
    backdropBlur,
    borderRadius,
    borderWidth,
    colors,
    fontFamily,
    fontSize,
    height,
    opacity,
    transitionDuration,
    transitionProperty,
    transitionTimingFunction,
    width
} from "~/config/external/tailwind"

const twMerge = extendTailwindMerge({
    override: {
        theme: {
            borderWidth: Object.keys(borderWidth),
            borderRadius: Object.keys(borderRadius),

            opacity: Object.keys(opacity)
        },
        classGroups: {
            "font-family": [{ font: Object.keys(fontFamily) }],
            "font-size": [{ text: Object.keys(fontSize) }],

            "backdrop-blur": [{ "backdrop-blur": Object.keys(backdropBlur) }]
        }
    },
    extend: {
        theme: {
            colors: Object.keys(colors)
        },
        classGroups: {
            w: [{ w: Object.keys(width) }],
            h: [{ h: Object.keys(height) }],

            transition: [{ transition: Object.keys(transitionProperty) }],

            duration: [{ duration: Object.keys(transitionDuration) }],
            ease: [{ ease: Object.keys(transitionTimingFunction) }],

            animate: [{ animate: Object.keys(animation) }]
        }
    }
})

export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs))
}
