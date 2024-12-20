/**
 *
 */

"use client"

import type * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
    createContext,
    forwardRef,
    useContext,
    useId,
    type ComponentPropsWithoutRef,
    type ElementRef,
    type HTMLAttributes
} from "react"
import {
    Controller,
    FormProvider,
    useFormContext,
    type ControllerProps,
    type FieldPath,
    type FieldValues
} from "react-hook-form"
import { Label } from "~/components/ui/primitives/display"
import { Exception } from "~/meta"
import { cn } from "~/utils/ui"

const Form = FormProvider

type FormFieldContextValue<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
    name: TName
}

const FormFieldContext = createContext<FormFieldContextValue>({} as FormFieldContextValue)

const FormField = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
    ...props
}: ControllerProps<TFieldValues, TName>) => {
    return (
        <FormFieldContext.Provider value={{ name: props.name }}>
            <Controller {...props} />
        </FormFieldContext.Provider>
    )
}

const useFormField = () => {
    const fieldContext = useContext(FormFieldContext)
    const itemContext = useContext(FormItemContext)
    const { getFieldState, formState } = useFormContext()

    const fieldState = getFieldState(fieldContext.name, formState)

    if (!fieldContext) {
        throw new Exception({
            in: "framework",
            of: "hook-outside-provider",
            with: {
                internal: {
                    label: "Invalid Form Field Hook Usage",
                    message: "`useFormField` must be used within a `FormField` component."
                }
            }
        })
    }

    const { id } = itemContext

    return {
        id,
        name: fieldContext.name,
        formItemId: `${id}-form-item`,
        formDescriptionId: `${id}-form-item-description`,
        formMessageId: `${id}-form-item-message`,
        ...fieldState
    }
}

type FormItemContextValue = {
    id: string
}

const FormItemContext = createContext<FormItemContextValue>({} as FormItemContextValue)

const FormItem = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
    const id = useId()

    return (
        <FormItemContext.Provider value={{ id }}>
            <div ref={ref} className={cn("space-y-8px", className)} {...props} />
        </FormItemContext.Provider>
    )
})

FormItem.displayName = "FormItem"

const FormLabel = forwardRef<ElementRef<typeof LabelPrimitive.Root>, ComponentPropsWithoutRef<typeof LabelPrimitive.Root>>(
    ({ className, ...props }, ref) => {
        const { formItemId } = useFormField()

        //  Removed cn(error && "text-danger", className).
        return <Label ref={ref} className={className} htmlFor={formItemId} {...props} />
    }
)

FormLabel.displayName = "FormLabel"

const FormControl = forwardRef<ElementRef<typeof Slot>, ComponentPropsWithoutRef<typeof Slot>>(
    ({ className, ...props }, ref) => {
        const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

        return (
            <Slot
                ref={ref}
                id={formItemId}
                aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
                aria-invalid={!!error}
                className={cn(error && "border-danger", className)}
                {...props}
            />
        )
    }
)

FormControl.displayName = "FormControl"

const FormDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
    ({ className, ...props }, ref) => {
        const { formDescriptionId } = useFormField()

        return <p ref={ref} id={formDescriptionId} className={cn("text-[0.8rem] text-main/half", className)} {...props} />
    }
)

FormDescription.displayName = "FormDescription"

const FormMessage = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
    ({ className, children, ...props }, ref) => {
        const { error, formMessageId } = useFormField()
        const body = error ? String(error?.message) : children

        if (!body) {
            return null
        }

        return (
            <p ref={ref} id={formMessageId} className={cn("text-12px font-medium text-danger", className)} {...props}>
                {body}
            </p>
        )
    }
)

FormMessage.displayName = "FormMessage"

export { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, useFormField }
