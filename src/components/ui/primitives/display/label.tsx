/**
 *
 */

"use client"

import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react"

import { cn } from "~/utils/ui"

const labelVariants = cva("text-14px font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:-opacity-quarter")

const Label = forwardRef<
    ElementRef<typeof LabelPrimitive.Root>,
    ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />)

Label.displayName = LabelPrimitive.Root.displayName

export { Label }
