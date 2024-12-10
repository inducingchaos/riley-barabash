/* eslint-disable @typescript-eslint/no-unused-vars */
//
//

const homeLayout = {
    type: "container",
    orientation: "horizontal",
    content: [
        {
            type: "text",
            size: "64px as rem",
            content: [
                {
                    content: "Knowledge systems for the "
                },
                {
                    color: "accent",
                    content: "obsessed."
                }
            ]
        },
        {
            type: "placeholder",
            content: "An animated ASCII art depiction of... a jet, or right arrows? Pre-record ASCII sequence."
        }
    ]
}

//  DON'T FOCUS TOO HEAVY ON TEMPLATING, JUST GET THE CODE TO WORK.

const stepsSection = {
    type: "container",
    orientation: "vertical",
    content: [
        {
            type: "custom",
            content: "path/to/svg/file.svg"
        },
        {
            type: "text",
            content: "Ideate & Consolidate."
        }
    ]
}

const defaultParams = {
    type: "container",
    orientation: "horizontal",
    color: {
        background: "background",
        text: "text",
        border: "border"
    },
    content: []
}

type PseudoLayoutType = {
    type: "container" | "text" | "placeholder"
    orientation?: "horizontal" | "vertical"
    alignment?: "center" | "top" | "top-right" | "right" | "bottom-right" | "bottom" | "bottom-left" | "left" | "top-left"
    size?: number | string

    color?: {
        background?: string
        text?: string
        border?: string
    }

    content: PseudoLayoutType[]
}

/*

NOTES:

Metadata could be used to pass params to a component, with the use of {{ }} syntax for global variables or scoped variables.

*/
