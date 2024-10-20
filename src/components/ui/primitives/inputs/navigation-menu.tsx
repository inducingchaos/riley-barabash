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
        className={cn("group flex flex-1 list-none items-center justify-center space-x-1", className)}
        {...props}
    />
))

NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName

const NavigationMenuItem = NavigationMenuPrimitive.Item

const navigationMenuTriggerStyle = cva(
    "group inline-flex h-9 w-max items-center justify-center px-4 py-2 text-14 font-medium transition-colors hover:bg-main-eighth focus:bg-main-eighth focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-main data-[state=open]:bg-main-eighth"
)

const NavigationMenuTrigger = forwardRef<
    ElementRef<typeof NavigationMenuPrimitive.Trigger>,
    ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
    <NavigationMenuPrimitive.Trigger ref={ref} className={cn(navigationMenuTriggerStyle(), "group", className)} {...props}>
        {children}{" "}
        <ChevronDownIcon
            className="relative top-[1px] ml-1 h-3 w-3 transition-transform duration-300 group-data-[state=open]:rotate-180"
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
        className={cn(
            "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto",
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
    <div className={cn("absolute left-0 top-full flex justify-center")}>
        <NavigationMenuPrimitive.Viewport
            className={cn(
                "origin-top-center text-popover-foreground bg-inverse-upper-quarter relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden border backdrop-blur data-[state=closed]:animate-navigation-menu-exit data-[state=open]:animate-navigation-menu-enter md:w-[var(--radix-navigation-menu-viewport-width)]",

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
            "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
            className
        )}
        {...props}
    >
        <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-none bg-red-500 shadow-md" />
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
