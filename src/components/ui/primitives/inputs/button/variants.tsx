/**
 *
 */

import { cva, type VariantProps } from "class-variance-authority"
import { ucn } from "~/utils/ui"

const variants = {
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

    //  Make a responsive variant, or size fit/fill?/fixed

    shape: {
        standard: "px-16px py-8px",
        compact: "h-32px rounded px-12px text-12px",
        micro: "px-8px py-1px font-mono text-12px font-bold",
        //  Was h-10.
        display: "h-48px rounded px-32px",
        //  was size-9.
        square: "size-40px"
    }
}

const createVariant = cva(
    "inline-flex items-center justify-center gap-8px whitespace-nowrap rounded border border-transparent text-14px font-medium ring-offset-alternate transition-colors duration-quarter ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main/-eighth focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-half [&_svg]:pointer-events-none [&_svg]:size-16px [&_svg]:shrink-0",
    {
        variants,
        defaultVariants: {
            style: "fill",
            color: "main",
            intensity: "full",
            shape: "standard"
        },
        compoundVariants: [
            {
                style: "fill",
                color: "main",
                intensity: "full",
                className: ucn("bg-main text-alternate hover:bg-main/-quarter")
            },
            {
                style: "fill",
                color: "main",
                intensity: "reduced",
                className: ucn("bg-main/eighth hover:bg-main/sixteenth")
            },
            {
                style: "outline",
                color: "main",
                intensity: "full",
                className: ucn("border-main hover:bg-main hover:text-alternate")
            },
            {
                style: "outline",
                color: "main",
                intensity: "reduced",
                className: ucn("border-main/eighth hover:border-main/zero hover:bg-main/eighth")
            },
            {
                style: "ghost",
                color: "main",
                intensity: "full",
                className: ucn("hover:bg-main hover:text-alternate")
            },
            {
                style: "ghost",
                color: "main",
                intensity: "reduced",
                className: ucn("hover:bg-main/eighth")
            },
            {
                style: "link",
                color: "main",
                intensity: "full",
                className: ucn("hover:text-main/-quarter")
            },
            {
                style: "link",
                color: "main",
                intensity: "reduced",
                className: ucn("text-main/half hover:text-main/3-8")
            },

            {
                style: "fill",
                color: "warning",
                intensity: "full",
                className: ucn("bg-warning text-alternate hover:bg-warning/-quarter")
            },
            {
                style: "fill",
                color: "warning",
                intensity: "reduced",
                className: ucn("bg-warning/eighth text-warning hover:bg-warning/sixteenth")
            },
            {
                style: "outline",
                color: "warning",
                intensity: "full",
                className: ucn("border-warning text-warning hover:bg-warning hover:text-alternate")
            },
            {
                style: "outline",
                color: "warning",
                intensity: "reduced",
                className: ucn("border-warning/eighth text-warning hover:border-warning/zero hover:bg-warning/eighth")
            },
            {
                style: "ghost",
                color: "warning",
                intensity: "full",
                className: ucn("text-warning hover:bg-warning hover:text-alternate")
            },
            {
                style: "ghost",
                color: "warning",
                intensity: "reduced",
                className: ucn("text-warning hover:bg-warning/eighth")
            },
            {
                style: "link",
                color: "warning",
                intensity: "full",
                className: ucn("text-warning hover:text-warning/-quarter")
            },
            {
                style: "link",
                color: "warning",
                intensity: "reduced",
                className: ucn("text-warning/half hover:text-warning/3-8")
            },

            {
                style: "fill",
                color: "danger",
                intensity: "full",
                className: ucn("bg-danger text-alternate hover:bg-danger/-quarter")
            },
            {
                style: "fill",
                color: "danger",
                intensity: "reduced",
                className: ucn("bg-danger/eighth text-danger hover:bg-danger/sixteenth")
            },
            {
                style: "outline",
                color: "danger",
                intensity: "full",
                className: ucn("border-danger text-danger hover:bg-danger hover:text-alternate")
            },
            {
                style: "outline",
                color: "danger",
                intensity: "reduced",
                className: ucn("border-danger/eighth text-danger hover:border-danger/zero hover:bg-danger/eighth")
            },
            {
                style: "ghost",
                color: "danger",
                intensity: "full",
                className: ucn("text-danger hover:bg-danger hover:text-alternate")
            },
            {
                style: "ghost",
                color: "danger",
                intensity: "reduced",
                className: ucn("text-danger hover:bg-danger/eighth")
            },
            {
                style: "link",
                color: "danger",
                intensity: "full",
                className: ucn("text-danger hover:text-danger/-quarter")
            },
            {
                style: "link",
                color: "danger",
                intensity: "reduced",
                className: ucn("text-danger/half hover:text-danger/3-8")
            },

            {
                style: "fill",
                color: "success",
                intensity: "full",
                className: ucn("bg-success text-alternate hover:bg-success/-quarter")
            },
            {
                style: "fill",
                color: "success",
                intensity: "reduced",
                className: ucn("bg-success/eighth text-success hover:bg-success/sixteenth")
            },
            {
                style: "outline",
                color: "success",
                intensity: "full",
                className: ucn("border-success text-success hover:bg-success hover:text-alternate")
            },
            {
                style: "outline",
                color: "success",
                intensity: "reduced",
                className: ucn("border-success/eighth text-success hover:border-success/zero hover:bg-success/eighth")
            },
            {
                style: "ghost",
                color: "success",
                intensity: "full",
                className: ucn("text-success hover:bg-success hover:text-alternate")
            },
            {
                style: "ghost",
                color: "success",
                intensity: "reduced",
                className: ucn("text-success hover:bg-success/eighth")
            },
            {
                style: "link",
                color: "success",
                intensity: "full",
                className: ucn("text-success hover:text-success/-quarter")
            },
            {
                style: "link",
                color: "success",
                intensity: "reduced",
                className: ucn("text-success/half hover:text-success/3-8")
            },

            {
                style: "fill",
                color: "info",
                intensity: "full",
                className: ucn("bg-info text-alternate hover:bg-info/-quarter")
            },
            {
                style: "fill",
                color: "info",
                intensity: "reduced",
                className: ucn("bg-info/eighth text-info hover:bg-info/sixteenth")
            },
            {
                style: "outline",
                color: "info",
                intensity: "full",
                className: ucn("border-info text-info hover:bg-info hover:text-alternate")
            },
            {
                style: "outline",
                color: "info",
                intensity: "reduced",
                className: ucn("border-info/eighth text-info hover:border-info/zero hover:bg-info/eighth")
            },
            {
                style: "ghost",
                color: "info",
                intensity: "full",
                className: ucn("text-info hover:bg-info hover:text-alternate")
            },
            {
                style: "ghost",
                color: "info",
                intensity: "reduced",
                className: ucn("text-info hover:bg-info/eighth")
            },
            {
                style: "link",
                color: "info",
                intensity: "full",
                className: ucn("text-info hover:text-info/-quarter")
            },
            {
                style: "link",
                color: "info",
                intensity: "reduced",
                className: ucn("text-info/half hover:text-info/3-8")
            },

            {
                style: "fill",
                color: "accent",
                intensity: "full",
                className: ucn("bg-accent-neutral text-alternate hover:bg-accent-neutral/-quarter")
            },
            {
                style: "fill",
                color: "accent",
                intensity: "reduced",
                className: ucn("bg-accent-neutral/eighth text-accent-neutral hover:bg-accent-neutral/sixteenth")
            },
            {
                style: "outline",
                color: "accent",
                intensity: "full",
                className: ucn("border-accent-neutral text-accent-neutral hover:bg-accent-neutral hover:text-alternate")
            },
            {
                style: "outline",
                color: "accent",
                intensity: "reduced",
                className:
                    "hover:bg-accent-neutral-eighth border-accent-neutral-eighth hover:border-accent-neutral-zero text-accent-neutral"
            },
            {
                style: "ghost",
                color: "accent",
                intensity: "full",
                className: ucn("text-accent-neutral hover:bg-accent-neutral hover:text-alternate")
            },
            {
                style: "ghost",
                color: "accent",
                intensity: "reduced",
                className: ucn("text-accent-neutral hover:bg-accent-neutral/eighth")
            },
            {
                style: "link",
                color: "accent",
                intensity: "full",
                className: ucn("text-accent-neutral hover:text-accent-neutral/-quarter")
            },
            {
                style: "link",
                color: "accent",
                intensity: "reduced",
                className: ucn("text-accent-neutral/half hover:text-accent-neutral/3-8")
            }
        ]
    }
)

export type VariantOptions = VariantProps<typeof createVariant>

export function createButtonVariant({ using: options }: { using?: VariantOptions }): string {
    return createVariant(options)
}
