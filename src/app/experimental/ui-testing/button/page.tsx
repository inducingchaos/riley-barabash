/**
 *
 */

import React from "react"
import { Starter } from "~/components/ui/compositions/templates"
import { Button } from "~/components/ui/primitives/inputs"
import { type VariantOptions } from "~/components/ui/primitives/inputs/button/variants"

const styles = ["fill", "outline", "ghost", "link"] as const
const colors = ["main", "warning", "danger", "success", "info", "accent"] as const
const intensities = ["full", "reduced"] as const

type ButtonVariation = {
    style: NonNullable<VariantOptions["style"]>
    color: NonNullable<VariantOptions["color"]>
    intensity: NonNullable<VariantOptions["intensity"]>
}

const ButtonGrid: React.FC<{ variations: ButtonVariation[] }> = ({ variations }) => (
    <div className="grid grid-cols-8 gap-2">
        {variations.map((variation, index) => (
            <Button key={index} {...variation}>
                {variation.color}
            </Button>
        ))}
    </div>
)

export default function Page(): JSX.Element {
    const buttonVariations: ButtonVariation[] = colors.flatMap(color =>
        styles.flatMap(style => intensities.map(intensity => ({ color, style, intensity })))
    )

    // Custom sorting function
    const sortedVariations = buttonVariations.sort((a, b) => {
        // Sort by color first (main first)
        if (a.color !== b.color) {
            return a.color === "main" ? -1 : b.color === "main" ? 1 : colors.indexOf(a.color) - colors.indexOf(b.color)
        }
        // Then by style
        if (a.style !== b.style) {
            return styles.indexOf(a.style) - styles.indexOf(b.style)
        }
        // Finally by intensity (full first)
        return a.intensity === "full" ? -1 : 1
    })

    return (
        <Starter>
            <div className="max-w-8xl mx-auto w-full py-16">
                <ButtonGrid variations={sortedVariations} />
            </div>
        </Starter>
    )
}
