/**
 *
 */

"use client"

import { CaretSortIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons"
import * as SelectPrimitive from "@radix-ui/react-select"
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react"
import { cn } from "~/utils/ui"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = forwardRef<
    ElementRef<typeof SelectPrimitive.Trigger>,
    ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
    <SelectPrimitive.Trigger
        ref={ref}
        // was h-9..
        className={cn(
            "flex h-32px w-full items-center justify-between whitespace-nowrap rounded-6px border border-main/sixteenth bg-transparent px-12px py-8px text-14px shadow-sm ring-offset-alternate placeholder:text-main/half focus:outline-none focus:ring-1 focus:ring-accent-constant disabled:cursor-not-allowed disabled:opacity-half [&>span]:line-clamp-1",
            className
        )}
        {...props}
    >
        {children}
        <SelectPrimitive.Icon asChild>
            <CaretSortIcon className="size-16px opacity-half" />
        </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
))

SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = forwardRef<
    ElementRef<typeof SelectPrimitive.ScrollUpButton>,
    ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
    <SelectPrimitive.ScrollUpButton
        ref={ref}
        className={cn("flex cursor-default items-center justify-center py-4px", className)}
        {...props}
    >
        <ChevronUpIcon />
    </SelectPrimitive.ScrollUpButton>
))

SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = forwardRef<
    ElementRef<typeof SelectPrimitive.ScrollDownButton>,
    ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
    <SelectPrimitive.ScrollDownButton
        ref={ref}
        className={cn("flex cursor-default items-center justify-center py-4px", className)}
        {...props}
    >
        <ChevronDownIcon />
    </SelectPrimitive.ScrollDownButton>
))

SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName

const SelectContent = forwardRef<
    ElementRef<typeof SelectPrimitive.Content>,
    ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
    <SelectPrimitive.Portal>
        <SelectPrimitive.Content
            ref={ref}
            className={cn(
                "relative z-50 max-h-384px min-w-[8rem] overflow-hidden rounded-6px border bg-alternate text-main shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-zero data-[state=open]:fade-in-zero data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-8px data-[side=left]:slide-in-from-right-8px data-[side=right]:slide-in-from-left-8px data-[side=top]:slide-in-from-bottom-8px",
                position === "popper" &&
                    "data-[side=bottom]:translate-y-4px data-[side=left]:-translate-x-4px data-[side=right]:translate-x-4px data-[side=top]:-translate-y-4px",
                className
            )}
            position={position}
            {...props}
        >
            <SelectScrollUpButton />
            <SelectPrimitive.Viewport
                className={cn(
                    "p-4px",
                    position === "popper" &&
                        "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
                )}
            >
                {children}
            </SelectPrimitive.Viewport>
            <SelectScrollDownButton />
        </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
))

SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = forwardRef<
    ElementRef<typeof SelectPrimitive.Label>,
    ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
    <SelectPrimitive.Label ref={ref} className={cn("px-8px py-6px text-14px font-semibold", className)} {...props} />
))

SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = forwardRef<ElementRef<typeof SelectPrimitive.Item>, ComponentPropsWithoutRef<typeof SelectPrimitive.Item>>(
    ({ className, children, ...props }, ref) => (
        <SelectPrimitive.Item
            ref={ref}
            className={cn(
                "relative flex w-full cursor-default select-none items-center rounded-2px py-6px pl-8px pr-32px text-14px outline-none focus:bg-main/sixteenth focus:text-main data-[disabled]:pointer-events-none data-[disabled]:opacity-half",
                className
            )}
            {...props}
        >
            {/* this was h-3.5, w-12px */}
            <span className="absolute right-8px flex size-12px items-center justify-center">
                <SelectPrimitive.ItemIndicator>
                    <CheckIcon className="size-16px" />
                </SelectPrimitive.ItemIndicator>
            </span>
            <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
        </SelectPrimitive.Item>
    )
)

SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = forwardRef<
    ElementRef<typeof SelectPrimitive.Separator>,
    ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
    <SelectPrimitive.Separator ref={ref} className={cn("-mx-4px my-4px h-1px bg-main/sixteenth", className)} {...props} />
))

SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectScrollDownButton,
    SelectScrollUpButton,
    SelectSeparator,
    SelectTrigger,
    SelectValue
}
