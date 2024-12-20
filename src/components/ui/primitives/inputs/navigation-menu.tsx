/**
 *
 */

import { ChevronDownIcon } from "@radix-ui/react-icons"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cva } from "class-variance-authority"
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react"
import { cn } from "~/utils/ui"

const NavigationMenu = forwardRef<
    ElementRef<typeof NavigationMenuPrimitive.Root>,
    ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
    <NavigationMenuPrimitive.Root
        ref={ref}
        delayDuration={125}
        className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center", className)}
        {...props}
    >
        {children}
        <NavigationMenuViewport />
    </NavigationMenuPrimitive.Root>
))

NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName

const NavigationMenuList = forwardRef<
    ElementRef<typeof NavigationMenuPrimitive.List>,
    ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
    <NavigationMenuPrimitive.List
        ref={ref}
        className={cn("group flex flex-1 list-none items-center justify-center space-x-4px", className)}
        {...props}
    />
))

NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName

const NavigationMenuItem = NavigationMenuPrimitive.Item

// was h-9

const navigationMenuTriggerStyle = cva(
    "group inline-flex h-32px w-max items-center justify-center px-16px py-8px text-14px font-medium transition-colors hover:bg-main/eighth focus:bg-main/eighth focus:outline-none disabled:pointer-events-none disabled:opacity-half data-[active]:bg-main data-[state=open]:bg-main/eighth"
)

const NavigationMenuTrigger = forwardRef<
    ElementRef<typeof NavigationMenuPrimitive.Trigger>,
    ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
    <NavigationMenuPrimitive.Trigger ref={ref} className={cn(navigationMenuTriggerStyle(), "group", className)} {...props}>
        {children}{" "}
        <ChevronDownIcon
            className="relative top-1px ml-4px size-12px transition-transform duration-quarter group-data-[state=open]:rotate-180"
            aria-hidden="true"
        />
    </NavigationMenuPrimitive.Trigger>
))

NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName

const NavigationMenuContent = forwardRef<
    ElementRef<typeof NavigationMenuPrimitive.Content>,
    ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
    <NavigationMenuPrimitive.Content
        ref={ref}
        // was slide-52 x4
        className={cn(
            "left-0px top-0px w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-192px data-[motion=from-start]:slide-in-from-left-192px data-[motion=to-end]:slide-out-to-right-192px data-[motion=to-start]:slide-out-to-left-192px md:absolute md:w-auto",
            className
        )}
        {...props}
    />
))

NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName

const NavigationMenuLink = NavigationMenuPrimitive.Link

const NavigationMenuViewport = forwardRef<
    ElementRef<typeof NavigationMenuPrimitive.Viewport>,
    ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
    <div className={cn("absolute left-0px top-full flex justify-center")}>
        <NavigationMenuPrimitive.Viewport
            className={cn(
                "relative mt-6px h-[var(--radix-navigation-menu-viewport-height)] w-full origin-top overflow-hidden border bg-alternate/-quarter text-main backdrop-blur data-[state=closed]:animate-navigation-menu-exit data-[state=open]:animate-navigation-menu-enter md:w-[var(--radix-navigation-menu-viewport-width)]",

                className
            )}
            ref={ref}
            {...props}
        />
    </div>
))

NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName

const NavigationMenuIndicator = forwardRef<
    ElementRef<typeof NavigationMenuPrimitive.Indicator>,
    ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
    <NavigationMenuPrimitive.Indicator
        ref={ref}
        className={cn(
            "top-full z-[1] flex h-6px items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
            className
        )}
        {...props}
    >
        <div className="relative top-[60%] size-8px rotate-45 rounded-0px bg-red-500 shadow-md" />
    </NavigationMenuPrimitive.Indicator>
))

NavigationMenuIndicator.displayName = NavigationMenuPrimitive.Indicator.displayName

export {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
    NavigationMenuViewport
}
