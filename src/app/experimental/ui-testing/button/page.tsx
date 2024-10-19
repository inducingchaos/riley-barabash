/**
 *
 */

import React from "react"
import { Starter } from "~/components/ui/compositions/templates"
import { Button } from "~/components/ui/primitives/inputs"

const styles = ["normal", "outline", "ghost", "link"] as const
const colors = ["main", "warning", "danger", "success", "info", "accent"] as const
const intensities = ["normal", "dimmed"] as const
const contrasts = ["normal", "high"] as const

type ButtonVariation = {
    style: (typeof styles)[number]
    color: (typeof colors)[number]
    intensity: (typeof intensities)[number]
    contrast: (typeof contrasts)[number]
}

const ButtonRow: React.FC<ButtonVariation> = ({ style, color, intensity, contrast }) => (
    <div className="mb-4 flex items-center justify-between gap-8">
        <div className="text-sm">
            <p>Style: {style}</p>
            <p>Color: {color}</p>
            <p>Intensity: {intensity}</p>
            <p>Contrast: {contrast}</p>
        </div>
        <Button style={style} color={color} intensity={intensity} contrast={contrast}>
            Button
        </Button>
    </div>
)

export default function Page(): JSX.Element {
    const buttonVariations: ButtonVariation[] = colors.flatMap(color =>
        contrasts.flatMap(contrast =>
            styles.flatMap(style => intensities.map(intensity => ({ color, contrast, style, intensity })))
        )
    )

    // Custom sorting function
    const sortedVariations = buttonVariations.sort((a, b) => {
        // Sort by color first (main first)
        if (a.color !== b.color) {
            return a.color === "main" ? -1 : b.color === "main" ? 1 : colors.indexOf(a.color) - colors.indexOf(b.color)
        }
        // Then by contrast (normal first)
        if (a.contrast !== b.contrast) {
            return a.contrast === "normal" ? -1 : 1
        }
        // Then by style
        if (a.style !== b.style) {
            return styles.indexOf(a.style) - styles.indexOf(b.style)
        }
        // Finally by intensity (normal first)
        return a.intensity === "normal" ? -1 : 1
    })

    return (
        <Starter>
            <div className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center py-64">
                {sortedVariations.map((variation, index) => (
                    <ButtonRow key={index} {...variation} />
                ))}
            </div>
        </Starter>
    )
}
