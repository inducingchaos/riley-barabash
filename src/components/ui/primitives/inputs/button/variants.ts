/**
 *
 */

import { cva, type VariantProps } from "class-variance-authority"

const transformer = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded text-14 font-medium ring-offset-alternate ease-out duration-250 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main-upper-eighth focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-transparent",
    {
        variants: {
            style: {
                fill: null,
                outline: null,
                ghost: null,
                link: "underline-offset-4 hover:underline"
            },

            color: {
                main: null,
                warning: null,
                danger: null,
                success: null,
                info: null,
                accent: null
            },
            intensity: {
                full: null,
                reduced: null
            },

            shape: {
                standard: "px-4 py-2",

                compact: "h-8 rounded px-3 text-xs",
                display: "h-10 rounded px-8",
                square: "h-9 w-9"
            }
        },
        compoundVariants: [
            {
                style: "fill",
                color: "main",
                intensity: "full",
                className: "bg-main text-alternate hover:bg-main-upper-quarter"
            },
            {
                style: "fill",
                color: "main",
                intensity: "reduced",
                className: "bg-main-eighth hover:bg-main-sixteenth"
            },
            {
                style: "outline",
                color: "main",
                intensity: "full",
                className: "border-main hover:bg-main hover:text-alternate"
            },
            {
                style: "outline",
                color: "main",
                intensity: "reduced",
                className: "border-main-eighth hover:bg-main-eighth hover:border-main-zero"
            },
            {
                style: "ghost",
                color: "main",
                intensity: "full",
                className: "hover:bg-main hover:text-alternate"
            },
            {
                style: "ghost",
                color: "main",
                intensity: "reduced",
                className: "hover:bg-main-eighth"
            },
            {
                style: "link",
                color: "main",
                intensity: "full",
                className: "hover:text-main-upper-quarter"
            },
            {
                style: "link",
                color: "main",
                intensity: "reduced",
                className: "text-main-half hover:text-main-3/8"
            },

            {
                style: "fill",
                color: "warning",
                intensity: "full",
                className: "bg-warning text-alternate hover:bg-warning-upper-quarter"
            },
            {
                style: "fill",
                color: "warning",
                intensity: "reduced",
                className: "bg-warning-eighth text-warning hover:bg-warning-sixteenth"
            },
            {
                style: "outline",
                color: "warning",
                intensity: "full",
                className: "border-warning text-warning hover:bg-warning hover:text-alternate"
            },
            {
                style: "outline",
                color: "warning",
                intensity: "reduced",
                className: "hover:bg-warning-eighth border-warning-eighth text-warning hover:border-warning-zero"
            },
            {
                style: "ghost",
                color: "warning",
                intensity: "full",
                className: "text-warning hover:bg-warning hover:text-alternate"
            },
            {
                style: "ghost",
                color: "warning",
                intensity: "reduced",
                className: "hover:bg-warning-eighth text-warning"
            },
            {
                style: "link",
                color: "warning",
                intensity: "full",
                className: "text-warning hover:text-warning-upper-quarter"
            },
            {
                style: "link",
                color: "warning",
                intensity: "reduced",
                className: "text-warning-half hover:text-warning-3/8"
            },

            {
                style: "fill",
                color: "danger",
                intensity: "full",
                className: "bg-danger text-alternate hover:bg-danger-upper-quarter"
            },
            {
                style: "fill",
                color: "danger",
                intensity: "reduced",
                className: "bg-danger-eighth text-danger hover:bg-danger-sixteenth"
            },
            {
                style: "outline",
                color: "danger",
                intensity: "full",
                className: "border-danger text-danger hover:bg-danger hover:text-alternate"
            },
            {
                style: "outline",
                color: "danger",
                intensity: "reduced",
                className: "hover:bg-danger-eighth border-danger-eighth text-danger hover:border-danger-zero"
            },
            {
                style: "ghost",
                color: "danger",
                intensity: "full",
                className: "text-danger hover:bg-danger hover:text-alternate"
            },
            {
                style: "ghost",
                color: "danger",
                intensity: "reduced",
                className: "hover:bg-danger-eighth text-danger"
            },
            {
                style: "link",
                color: "danger",
                intensity: "full",
                className: "text-danger hover:text-danger-upper-quarter"
            },
            {
                style: "link",
                color: "danger",
                intensity: "reduced",
                className: "text-danger-half hover:text-danger-3/8"
            },

            {
                style: "fill",
                color: "success",
                intensity: "full",
                className: "bg-success text-alternate hover:bg-success-upper-quarter"
            },
            {
                style: "fill",
                color: "success",
                intensity: "reduced",
                className: "bg-success-eighth text-success hover:bg-success-sixteenth"
            },
            {
                style: "outline",
                color: "success",
                intensity: "full",
                className: "border-success text-success hover:bg-success hover:text-alternate"
            },
            {
                style: "outline",
                color: "success",
                intensity: "reduced",
                className: "hover:bg-success-eighth border-success-eighth text-success hover:border-success-zero"
            },
            {
                style: "ghost",
                color: "success",
                intensity: "full",
                className: "text-success hover:bg-success hover:text-alternate"
            },
            {
                style: "ghost",
                color: "success",
                intensity: "reduced",
                className: "hover:bg-success-eighth text-success"
            },
            {
                style: "link",
                color: "success",
                intensity: "full",
                className: "text-success hover:text-success-upper-quarter"
            },
            {
                style: "link",
                color: "success",
                intensity: "reduced",
                className: "text-success-half hover:text-success-3/8"
            },

            {
                style: "fill",
                color: "info",
                intensity: "full",
                className: "bg-info text-alternate hover:bg-info-upper-quarter"
            },
            {
                style: "fill",
                color: "info",
                intensity: "reduced",
                className: "bg-info-eighth text-info hover:bg-info-sixteenth"
            },
            {
                style: "outline",
                color: "info",
                intensity: "full",
                className: "border-info text-info hover:bg-info hover:text-alternate"
            },
            {
                style: "outline",
                color: "info",
                intensity: "reduced",
                className: "hover:bg-info-eighth border-info-eighth text-info hover:border-info-zero"
            },
            {
                style: "ghost",
                color: "info",
                intensity: "full",
                className: "text-info hover:bg-info hover:text-alternate"
            },
            {
                style: "ghost",
                color: "info",
                intensity: "reduced",
                className: "hover:bg-info-eighth text-info"
            },
            {
                style: "link",
                color: "info",
                intensity: "full",
                className: "text-info hover:text-info-upper-quarter"
            },
            {
                style: "link",
                color: "info",
                intensity: "reduced",
                className: "text-info-half hover:text-info-3/8"
            },

            {
                style: "fill",
                color: "accent",
                intensity: "full",
                className: "bg-accent-neutral text-alternate hover:bg-accent-neutral-upper-quarter"
            },
            {
                style: "fill",
                color: "accent",
                intensity: "reduced",
                className: "bg-accent-neutral-eighth text-accent-neutral hover:bg-accent-neutral-sixteenth"
            },
            {
                style: "outline",
                color: "accent",
                intensity: "full",
                className: "border-accent-neutral text-accent-neutral hover:bg-accent-neutral hover:text-alternate"
            },
            {
                style: "outline",
                color: "accent",
                intensity: "reduced",
                className:
                    "hover:bg-accent-neutral-eighth border-accent-neutral-eighth text-accent-neutral hover:border-accent-neutral-zero"
            },
            {
                style: "ghost",
                color: "accent",
                intensity: "full",
                className: "text-accent-neutral hover:bg-accent-neutral hover:text-alternate"
            },
            {
                style: "ghost",
                color: "accent",
                intensity: "reduced",
                className: "hover:bg-accent-neutral-eighth text-accent-neutral"
            },
            {
                style: "link",
                color: "accent",
                intensity: "full",
                className: "text-accent-neutral hover:text-accent-neutral-upper-quarter"
            },
            {
                style: "link",
                color: "accent",
                intensity: "reduced",
                className: "text-accent-neutral-half hover:text-accent-neutral-3/8"
            }
        ],
        defaultVariants: {
            style: "fill",
            color: "main",
            intensity: "full",
            shape: "standard"
        }
    }
)

export type VariantOptions = VariantProps<typeof transformer>

export function createButtonVariant({ using: options }: { using: VariantOptions }): string {
    return transformer(options)
}
