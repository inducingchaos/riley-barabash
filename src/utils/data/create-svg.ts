/**
 * @file Utilities for creating, exporting, and implementing static and dynamic SVGs.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #utils
 * #data
 * #create-svg
 * #ts
 *
 * @todo
 * - [P4] Review and revise this code. It works, but it's old.
 */

import { useTheme } from "next-themes"

export type SVGAspectRatio = "none" | "xMidYMid meet"
export type SVGTheme = "light" | "dark" | "auto"

export interface SVGProps extends React.HTMLAttributes<SVGElement> {
    width?: number
    height?: number
    preserveAspectRatio?: SVGAspectRatio
    theme?: SVGTheme
    squareBounds?: boolean
    viewBox?: string
}

export type SVG = (props: SVGProps) => JSX.Element

export function createSVG(Comp: SVG): SVG {
    return (props: SVGProps): JSX.Element => {
        const { resolvedTheme } = useTheme()
        const theme: SVGTheme = !!props.theme && props.theme !== "auto" ? props.theme : ((resolvedTheme as SVGTheme) ?? "light")

        return Comp({ ...props, theme })
    }
}