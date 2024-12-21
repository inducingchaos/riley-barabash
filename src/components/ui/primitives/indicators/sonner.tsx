/* eslint-disable tailwindcss/no-custom-classname */

"use client"

import { useTheme } from "next-themes"
import { Toaster } from "sonner"
import { ucn } from "~/utils/ui"

type SonnerProps = React.ComponentProps<typeof Toaster>

const Sonner = ({ ...props }: SonnerProps) => {
    const { theme = "system" } = useTheme()

    return (
        <Toaster
            theme={theme as SonnerProps["theme"]}
            className="toaster group"
            toastOptions={{
                classNames: {
                    toast: ucn(
                        "toast group group-[.toaster]:border-main/eighth group-[.toaster]:bg-alternate group-[.toaster]:text-main group-[.toaster]:shadow-none"
                    ),
                    description: ucn("group-[.toast]:text-main/half"),
                    actionButton: ucn("group-[.toast]:bg-accent-constant group-[.toast]:text-alternate-constant"),
                    cancelButton: ucn("group-[.toast]:bg-main/sixteenth group-[.toast]:text-main/half")
                }
            }}
            {...props}
        />
    )
}

export { Sonner }
