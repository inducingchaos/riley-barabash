/**
 * @todo
 * - [P4] Review code.
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
