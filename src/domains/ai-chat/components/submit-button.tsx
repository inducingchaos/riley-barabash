"use client"

import { useFormStatus } from "react-dom"

import { LoaderIcon } from "~/domains/ai-chat/components/icons"

import { Button } from "~/components/ui/primitives/inputs"

export function SubmitButton({ children, isSuccessful }: { children: React.ReactNode; isSuccessful: boolean }) {
    const { pending } = useFormStatus()

    return (
        <Button
            type={pending ? "button" : "submit"}
            aria-disabled={pending || isSuccessful}
            disabled={pending || isSuccessful}
            className="relative"
        >
            {children}

            {(pending || isSuccessful) && (
                <span className="absolute right-16px animate-spin">
                    <LoaderIcon />
                </span>
            )}

            <output aria-live="polite" className="sr-only">
                {pending || isSuccessful ? "Loading" : "Submit form"}
            </output>
        </Button>
    )
}
