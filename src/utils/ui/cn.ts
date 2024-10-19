/**
 *
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
    transitionDuration,
    transitionTimingFunction,
    width
} from "~/config/external/tailwind"

const twMerge = extendTailwindMerge({
    override: {
        theme: {
            borderWidth: Object.keys(borderWidth),
            borderRadius: Object.keys(borderRadius)
        },
        classGroups: {
            "font-family": Object.keys(fontFamily),
            "font-size": Object.keys(fontSize),

            "backdrop-blur": Object.keys(backdropBlur)
        }
    },
    extend: {
        theme: {
            colors: Object.keys(colors)
        },
        classGroups: {
            w: Object.keys(width),
            h: Object.keys(height),

            duration: Object.keys(transitionDuration),
            ease: Object.keys(transitionTimingFunction),

            animate: Object.keys(animation)
        }
    }
})

export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs))
}
