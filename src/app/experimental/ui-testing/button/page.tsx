/**
 *
 */

import { Starter } from "~/components/ui/compositions/templates"
import { Button } from "~/components/ui/primitives/inputs"

export default function Page(): JSX.Element {
    return (
        <Starter>
            <Button variant="destructive">Click me</Button>
            <div className="mt-8 flex flex-col gap-4">
                <h2 className="text-xl font-semibold">CSS Variable Color Demonstration</h2>
                <div className="grid grid-cols-3 gap-4">
                    {[
                        { name: "Amber", light: "--color-amber-light", dark: "--color-amber-dark", base: "--color-amber" },
                        { name: "Red", light: "--color-red-light", dark: "--color-red-dark", base: "--color-red" },
                        { name: "Green", light: "--color-green-light", dark: "--color-green-dark", base: "--color-green" },
                        { name: "Blue", light: "--color-blue-light", dark: "--color-blue-dark", base: "--color-blue" }
                    ].map(color => (
                        <div key={color.name} className="flex flex-col items-center">
                            <span className="mb-2">{color.name}</span>
                            <div className="h-48 rounded-1.5 w-20 flex flex-col gap-8">
                                <div className="flex-1" style={{ backgroundColor: `hsl(var(${color.light}))` }}></div>
                                <div className="flex-1" style={{ backgroundColor: `hsl(var(${color.base}))` }}></div>
                                <div className="flex-1" style={{ backgroundColor: `hsl(var(${color.dark}))` }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Starter>
    )
}
