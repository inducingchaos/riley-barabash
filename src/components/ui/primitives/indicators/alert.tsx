/**
 *
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/utils/ui"

// was pl-7
const alertVariants = cva(
    "relative w-full rounded-8px border px-16px py-12px text-14px [&>svg+div]:-translate-y-3px [&>svg]:absolute [&>svg]:left-16px [&>svg]:top-16px [&>svg]:text-main [&>svg~*]:pl-32px",
    {
        variants: {
            variant: {
                default: "bg-alternate text-main",
                destructive: "border-danger/half text-danger dark:border-danger [&>svg]:text-danger"
            }
        },
        defaultVariants: {
            variant: "default"
        }
    }
)

const Alert = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>>(
    ({ className, variant, ...props }, ref) => (
        <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
    )
)
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
        <h5 ref={ref} className={cn("mb-4px font-medium leading-none tracking-tight", className)} {...props} />
    )
)
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
    ({ className, ...props }, ref) => <div ref={ref} className={cn("text-14px [&_p]:leading-relaxed", className)} {...props} />
)
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
