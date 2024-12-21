/**
 *
 */

"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { CheckIcon, ChevronRightIcon, DotFilledIcon } from "@radix-ui/react-icons"

import { cn } from "~/utils/ui"

const DropdownMenu = DropdownMenuPrimitive.Root
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
const DropdownMenuGroup = DropdownMenuPrimitive.Group
const DropdownMenuPortal = DropdownMenuPrimitive.Portal
const DropdownMenuSub = DropdownMenuPrimitive.Sub
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
        inset?: boolean
    }
>(({ className, inset, children, ...props }, ref) => (
    <DropdownMenuPrimitive.SubTrigger
        ref={ref}
        className={cn(
            "flex cursor-default select-none items-center gap-8px rounded-2x px-8px py-6px text-14px outline-none focus:bg-main/sixteenth data-[state=open]:bg-main/sixteenth [&_svg]:pointer-events-none [&_svg]:size-16px [&_svg]:shrink-0",
            inset && "pl-32px",
            className
        )}
        {...props}
    >
        {children}
        <ChevronRightIcon className="ml-auto size-16px" />
    </DropdownMenuPrimitive.SubTrigger>
))

DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
    <DropdownMenuPrimitive.SubContent
        ref={ref}
        className={cn(
            "z-50 min-w-[8rem] overflow-hidden rounded-6x border bg-alternate p-4px text-main data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-zero data-[state=open]:fade-in-zero data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-8px data-[side=left]:slide-in-from-right-8px data-[side=right]:slide-in-from-left-8px data-[side=top]:slide-in-from-bottom-8px",
            className
        )}
        {...props}
    />
))

DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
    <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
            ref={ref}
            sideOffset={sideOffset}
            className={cn(
                "z-50 min-w-[8rem] overflow-hidden rounded-6x border bg-alternate p-4px text-main",
                "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-zero data-[state=open]:fade-in-zero data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-8px data-[side=left]:slide-in-from-right-8px data-[side=right]:slide-in-from-left-8px data-[side=top]:slide-in-from-bottom-8px",
                className
            )}
            {...props}
        />
    </DropdownMenuPrimitive.Portal>
))

DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
        inset?: boolean
    }
>(({ className, inset, ...props }, ref) => (
    <DropdownMenuPrimitive.Item
        ref={ref}
        className={cn(
            "relative flex cursor-default select-none items-center gap-8px rounded-2x px-8px py-6px text-14px outline-none transition-colors focus:bg-main/sixteenth focus:text-main data-[disabled]:pointer-events-none data-[disabled]:opacity-half [&_svg]:pointer-events-none [&_svg]:size-16px [&_svg]:shrink-0",
            inset && "pl-32px",
            className
        )}
        {...props}
    />
))

DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
    <DropdownMenuPrimitive.CheckboxItem
        ref={ref}
        className={cn(
            "relative flex cursor-default select-none items-center rounded-2x py-6px pl-32px pr-8px text-14px outline-none transition-colors focus:bg-main/sixteenth focus:text-main data-[disabled]:pointer-events-none data-[disabled]:opacity-half",
            className
        )}
        checked={checked}
        {...props}
    >
        {/* This was h-3.5, w-12px */}
        <span className="absolute left-8px flex size-12px items-center justify-center">
            <DropdownMenuPrimitive.ItemIndicator>
                <CheckIcon className="size-16px" />
            </DropdownMenuPrimitive.ItemIndicator>
        </span>
        {children}
    </DropdownMenuPrimitive.CheckboxItem>
))

DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
    <DropdownMenuPrimitive.RadioItem
        ref={ref}
        className={cn(
            "relative flex cursor-default select-none items-center rounded-2x py-6px pl-32px pr-8px text-14px outline-none transition-colors focus:bg-main/sixteenth focus:text-main data-[disabled]:pointer-events-none data-[disabled]:opacity-half",
            className
        )}
        {...props}
    >
        {/* this was h-3.5, w-12px */}
        <span className="absolute left-8px flex size-12px items-center justify-center">
            <DropdownMenuPrimitive.ItemIndicator>
                <DotFilledIcon className="size-16px fill-current" />
            </DropdownMenuPrimitive.ItemIndicator>
        </span>
        {children}
    </DropdownMenuPrimitive.RadioItem>
))

DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Label>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
        inset?: boolean
    }
>(({ className, inset, ...props }, ref) => (
    <DropdownMenuPrimitive.Label
        ref={ref}
        className={cn("px-8px py-6px text-14px font-semibold", inset && "pl-32px", className)}
        {...props}
    />
))

DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
    <DropdownMenuPrimitive.Separator ref={ref} className={cn("-mx-4px my-4px h-1px bg-main/sixteenth", className)} {...props} />
))

DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>): JSX.Element => {
    return <span className={cn("ml-auto text-12px tracking-widest opacity-half", className)} {...props} />
}

DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuCheckboxItem,
    DropdownMenuRadioItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuGroup,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuRadioGroup
}
