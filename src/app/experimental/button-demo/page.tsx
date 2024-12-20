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

const ButtonGrid: React.FC<{
    variations: ButtonVariation[]
    custom?: { shape: "standard" | "compact" | "micro" | "display" | "square" | null | undefined }
}> = ({ variations, custom }) => (
    <div className="grid grid-cols-8 gap-8px">
        {variations.map((variation, index) => (
            <Button key={index} {...variation} shape={custom?.shape}>
                {variation.color}
            </Button>
        ))}
    </div>
)

// const CustomButtonGrid: React.FC<{ variations: ButtonVariation[] }> = ({ variations }) => (
//     <div className="grid grid-cols-8 gap-8px">
//         {variations.map((variation, index) => (
//             <Button key={index} {...variation} shape="display">
//                 {variation.color}
//             </Button>
//         ))}
//     </div>
// )

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
        <Starter className="gap-32px">
            <div className="flex flex-col gap-64px">
                <ButtonGrid variations={sortedVariations} />
                {/* <CustomButtonGrid variations={sortedVariations} /> */}
            </div>

            <div className="flex flex-col gap-64px">
                <ButtonGrid variations={sortedVariations} custom={{ shape: "micro" }} />
                {/* <CustomButtonGrid variations={sortedVariations} /> */}
            </div>
        </Starter>
    )
}
