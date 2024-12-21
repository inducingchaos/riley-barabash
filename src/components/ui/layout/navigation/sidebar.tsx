import { ViewVerticalIcon } from "@radix-ui/react-icons"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"
import { Button, Input } from "~/components/ui/primitives/inputs"
import { Separator, Skeleton } from "~/components/ui/primitives/display"
import { Sheet, SheetContent } from "~/components/ui/layout/sheet"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/primitives/indicators/tooltip"
import { useIsMobile } from "~/hooks/ui/use-mobile"
import { cn } from "~/utils/ui"

const SIDEBAR_COOKIE_NAME = "sidebar:state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarContext = {
    state: "expanded" | "collapsed"
    open: boolean
    setOpen: (open: boolean) => void
    openMobile: boolean
    setOpenMobile: (open: boolean) => void
    isMobile: boolean
    toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContext | null>(null)

function useSidebar() {
    const context = React.useContext(SidebarContext)
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider.")
    }

    return context
}

const SidebarProvider = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div"> & {
        defaultOpen?: boolean
        open?: boolean
        onOpenChange?: (open: boolean) => void
    }
>(({ defaultOpen = true, open: openProp, onOpenChange: setOpenProp, className, style, children, ...props }, ref) => {
    const isMobile = useIsMobile()
    const [openMobile, setOpenMobile] = React.useState(false)

    // This is the internal state of the sidebar.
    // We use openProp and setOpenProp for control from outside the component.
    const [_open, _setOpen] = React.useState(defaultOpen)
    const open = openProp ?? _open
    const setOpen = React.useCallback(
        (value: boolean | ((value: boolean) => boolean)) => {
            const openState = typeof value === "function" ? value(open) : value
            if (setOpenProp) {
                setOpenProp(openState)
            } else {
                _setOpen(openState)
            }

            // This sets the cookie to keep the sidebar state.
            document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
        },
        [setOpenProp, open]
    )

    // Helper to toggle the sidebar.
    const toggleSidebar = React.useCallback(() => {
        return isMobile ? setOpenMobile(open => !open) : setOpen(open => !open)
    }, [isMobile, setOpen, setOpenMobile])

    // Adds a keyboard shortcut to toggle the sidebar.
    React.useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
                event.preventDefault()
                toggleSidebar()
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [toggleSidebar])

    // We add a state so that we can do data-state="expanded" or "collapsed".
    // This makes it easier to style the sidebar with Tailwind classes.
    const state = open ? "expanded" : "collapsed"

    const contextValue = React.useMemo<SidebarContext>(
        () => ({
            state,
            open,
            setOpen,
            isMobile,
            openMobile,
            setOpenMobile,
            toggleSidebar
        }),
        [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
    )

    return (
        <SidebarContext.Provider value={contextValue}>
            <TooltipProvider delayDuration={0}>
                <div
                    style={
                        {
                            "--sidebar-width": SIDEBAR_WIDTH,
                            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
                            ...style
                        } as React.CSSProperties
                    }
                    className={cn(
                        "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-alternate",
                        className
                    )}
                    ref={ref}
                    {...props}
                >
                    {children}
                </div>
            </TooltipProvider>
        </SidebarContext.Provider>
    )
})
SidebarProvider.displayName = "SidebarProvider"

const Sidebar = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div"> & {
        side?: "left" | "right"
        variant?: "sidebar" | "floating" | "inset"
        collapsible?: "offcanvas" | "icon" | "none"
    }
>(({ side = "left", variant = "sidebar", collapsible = "offcanvas", className, children, ...props }, ref) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

    if (collapsible === "none") {
        return (
            <div
                className={cn("flex h-full w-[--sidebar-width] flex-col bg-alternate text-main", className)}
                ref={ref}
                {...props}
            >
                {children}
            </div>
        )
    }

    if (isMobile) {
        return (
            <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
                <SheetContent
                    data-sidebar="sidebar"
                    data-mobile="true"
                    className="w-[--sidebar-width] bg-alternate p-0px text-main [&>button]:hidden"
                    style={
                        {
                            "--sidebar-width": SIDEBAR_WIDTH_MOBILE
                        } as React.CSSProperties
                    }
                    side={side}
                >
                    <div className="flex size-full flex-col">{children}</div>
                </SheetContent>
            </Sheet>
        )
    }

    return (
        <div
            ref={ref}
            className="group peer hidden text-main md:block"
            data-state={state}
            data-collapsible={state === "collapsed" ? collapsible : ""}
            data-variant={variant}
            data-side={side}
        >
            {/* This is what handles the sidebar gap on desktop */}
            <div
                className={cn(
                    "relative h-svh w-[--sidebar-width] bg-transparent transition-[width] duration-quarter ease-linear",
                    "group-data-[collapsible=offcanvas]:w-0px",
                    "group-data-[side=right]:rotate-180",
                    variant === "floating" || variant === "inset"
                        ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.16px))]"
                        : "group-data-[collapsible=icon]:w-[--sidebar-width-icon]"
                )}
            />
            <div
                className={cn(
                    "fixed inset-y-0px z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] duration-quarter ease-linear md:flex",
                    side === "left"
                        ? "left-0px group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
                        : "right-0px group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
                    // Adjust the padding for floating and inset variants.
                    variant === "floating" || variant === "inset"
                        ? "p-8px group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.16px)_+2px)]"
                        : "group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l",
                    className
                )}
                {...props}
            >
                <div
                    data-sidebar="sidebar"
                    className="flex size-full flex-col bg-alternate group-data-[variant=floating]:rounded-8px group-data-[variant=floating]:border group-data-[variant=floating]:border-main/eighth group-data-[variant=floating]:shadow"
                >
                    {children}
                </div>
            </div>
        </div>
    )
})
Sidebar.displayName = "Sidebar"

const SidebarTrigger = React.forwardRef<React.ElementRef<typeof Button>, React.ComponentProps<typeof Button>>(
    ({ className, onClick, ...props }, ref) => {
        const { toggleSidebar } = useSidebar()

        return (
            <Button
                ref={ref}
                data-sidebar="trigger"
                style="ghost"
                shape="square"
                // was size-7
                className={cn("size-32px", className)}
                onClick={event => {
                    onClick?.(event)
                    toggleSidebar()
                }}
                {...props}
            >
                <ViewVerticalIcon />
                <span className="sr-only">Toggle Sidebar</span>
            </Button>
        )
    }
)
SidebarTrigger.displayName = "SidebarTrigger"

const SidebarRail = React.forwardRef<HTMLButtonElement, React.ComponentProps<"button">>(({ className, ...props }, ref) => {
    const { toggleSidebar } = useSidebar()

    return (
        <button
            ref={ref}
            data-sidebar="rail"
            aria-label="Toggle Sidebar"
            tabIndex={-1}
            onClick={toggleSidebar}
            title="Toggle Sidebar"
            className={cn(
                "absolute inset-y-0px z-20 hidden w-16px -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0px after:left-1/2 after:w-2px hover:after:bg-main/eighth group-data-[side=left]:-right-16px group-data-[side=right]:left-0px sm:flex",
                "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize",
                "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
                "group-data-[collapsible=offcanvas]:translate-x-0px group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-alternate",
                "[[data-side=left][data-collapsible=offcanvas]_&]:-right-8px",
                "[[data-side=right][data-collapsible=offcanvas]_&]:-left-8px",
                className
            )}
            {...props}
        />
    )
})
SidebarRail.displayName = "SidebarRail"

const SidebarInset = React.forwardRef<HTMLDivElement, React.ComponentProps<"main">>(({ className, ...props }, ref) => {
    return (
        <main
            ref={ref}
            className={cn(
                "relative flex min-h-svh flex-1 flex-col bg-alternate",
                "peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.16px))] md:peer-data-[variant=inset]:m-8px md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-8px md:peer-data-[variant=inset]:ml-0px md:peer-data-[variant=inset]:rounded-12px md:peer-data-[variant=inset]:shadow",
                className
            )}
            {...props}
        />
    )
})
SidebarInset.displayName = "SidebarInset"

const SidebarInput = React.forwardRef<React.ElementRef<typeof Input>, React.ComponentProps<typeof Input>>(
    ({ className, ...props }, ref) => {
        return (
            <Input
                ref={ref}
                data-sidebar="input"
                className={cn(
                    "h-32px w-full bg-alternate shadow-none focus-visible:ring-2 focus-visible:ring-accent-constant",
                    className
                )}
                {...props}
            />
        )
    }
)
SidebarInput.displayName = "SidebarInput"

const SidebarHeader = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => {
    return <div ref={ref} data-sidebar="header" className={cn("flex flex-col gap-8px p-8px", className)} {...props} />
})
SidebarHeader.displayName = "SidebarHeader"

const SidebarFooter = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => {
    return <div ref={ref} data-sidebar="footer" className={cn("flex flex-col gap-8px p-8px", className)} {...props} />
})
SidebarFooter.displayName = "SidebarFooter"

const SidebarSeparator = React.forwardRef<React.ElementRef<typeof Separator>, React.ComponentProps<typeof Separator>>(
    ({ className, ...props }, ref) => {
        return (
            <Separator
                ref={ref}
                data-sidebar="separator"
                className={cn("mx-8px w-auto bg-main/eighth", className)}
                {...props}
            />
        )
    }
)
SidebarSeparator.displayName = "SidebarSeparator"

const SidebarContent = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            data-sidebar="content"
            className={cn(
                "flex min-h-0px flex-1 flex-col gap-8px overflow-auto group-data-[collapsible=icon]:overflow-hidden",
                className
            )}
            {...props}
        />
    )
})
SidebarContent.displayName = "SidebarContent"

const SidebarGroup = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            data-sidebar="group"
            className={cn("relative flex w-full min-w-0px flex-col p-8px", className)}
            {...props}
        />
    )
})
SidebarGroup.displayName = "SidebarGroup"

const SidebarGroupLabel = React.forwardRef<HTMLDivElement, React.ComponentProps<"div"> & { asChild?: boolean }>(
    ({ className, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "div"

        return (
            <Comp
                ref={ref}
                data-sidebar="group-label"
                className={cn(
                    "flex h-32px shrink-0 items-center rounded-6px px-8px text-12px font-medium text-main/-quarter outline-none ring-accent-constant transition-[margin,opa] duration-quarter ease-linear focus-visible:ring-2 [&>svg]:size-16px [&>svg]:shrink-0",
                    "group-data-[collapsible=icon]:-mt-64px group-data-[collapsible=icon]:opacity-zero",
                    className
                )}
                {...props}
            />
        )
    }
)
SidebarGroupLabel.displayName = "SidebarGroupLabel"

const SidebarGroupAction = React.forwardRef<HTMLButtonElement, React.ComponentProps<"button"> & { asChild?: boolean }>(
    ({ className, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"

        return (
            <Comp
                ref={ref}
                data-sidebar="group-action"
                // was w-5,top-3.5
                className={cn(
                    "absolute right-12px top-16px flex aspect-square w-24px items-center justify-center rounded-6px p-0px text-main outline-none ring-accent-constant transition-transform hover:bg-main/sixteenth hover:text-main focus-visible:ring-2 [&>svg]:size-16px [&>svg]:shrink-0",
                    // Increases the hit area of the button on mobile.
                    "after:absolute after:-inset-8px after:md:hidden",
                    "group-data-[collapsible=icon]:hidden",
                    className
                )}
                {...props}
            />
        )
    }
)
SidebarGroupAction.displayName = "SidebarGroupAction"

const SidebarGroupContent = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => (
    <div ref={ref} data-sidebar="group-content" className={cn("w-full text-14px", className)} {...props} />
))
SidebarGroupContent.displayName = "SidebarGroupContent"

const SidebarMenu = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(({ className, ...props }, ref) => (
    <ul ref={ref} data-sidebar="menu" className={cn("flex w-full min-w-0px flex-col gap-4px", className)} {...props} />
))
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(({ className, ...props }, ref) => (
    <li ref={ref} data-sidebar="menu-item" className={cn("group/menu-item relative", className)} {...props} />
))
SidebarMenuItem.displayName = "SidebarMenuItem"

const sidebarMenuButtonVariants = cva(
    "peer/menu-button flex w-full items-center gap-8px overflow-hidden rounded-6px p-8px text-left text-14px outline-none ring-accent-constant transition-[width,height,padding] hover:bg-main/sixteenth hover:text-main focus-visible:ring-2 active:bg-main/sixteenth active:text-main disabled:pointer-events-none disabled:opacity-half group-has-[[data-sidebar=menu-action]]/menu-item:pr-32px aria-disabled:pointer-events-none aria-disabled:opacity-half data-[active=true]:bg-main/sixteenth data-[active=true]:font-medium data-[active=true]:text-main data-[state=open]:hover:bg-main/sixteenth data-[state=open]:hover:text-main group-data-[collapsible=icon]:!size-64px group-data-[collapsible=icon]:!p-8px [&>span:last-child]:truncate [&>svg]:size-16px [&>svg]:shrink-0",
    {
        variants: {
            variant: {
                default: "hover:bg-main/sixteenth hover:text-main",
                outline:
                    "bg-alternate shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-main/sixteenth hover:text-main hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
            },
            size: {
                default: "h-32px text-14px",
                // was h-7
                sm: "h-32px text-12px",
                lg: "h-48px text-14px group-data-[collapsible=icon]:!p-0px"
            }
        },
        defaultVariants: {
            variant: "default",
            size: "default"
        }
    }
)

const SidebarMenuButton = React.forwardRef<
    HTMLButtonElement,
    React.ComponentProps<"button"> & {
        asChild?: boolean
        isActive?: boolean
        tooltip?: string | React.ComponentProps<typeof TooltipContent>
    } & VariantProps<typeof sidebarMenuButtonVariants>
>(({ asChild = false, isActive = false, variant = "default", size = "default", tooltip, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const { isMobile, state } = useSidebar()

    const button = (
        <Comp
            ref={ref}
            data-sidebar="menu-button"
            data-size={size}
            data-active={isActive}
            className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
            {...props}
        />
    )

    if (!tooltip) {
        return button
    }

    if (typeof tooltip === "string") {
        tooltip = {
            children: tooltip
        }
    }

    return (
        <Tooltip>
            <TooltipTrigger asChild>{button}</TooltipTrigger>
            <TooltipContent side="right" align="center" hidden={state !== "collapsed" || isMobile} {...tooltip} />
        </Tooltip>
    )
})
SidebarMenuButton.displayName = "SidebarMenuButton"

const SidebarMenuAction = React.forwardRef<
    HTMLButtonElement,
    React.ComponentProps<"button"> & {
        asChild?: boolean
        showOnHover?: boolean
    }
>(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
        <Comp
            ref={ref}
            data-sidebar="menu-action"
            // was w-5
            className={cn(
                "absolute right-4px top-6px flex aspect-square w-24px items-center justify-center rounded-6px p-0px text-main outline-none ring-accent-constant transition-transform hover:bg-main/sixteenth hover:text-main focus-visible:ring-2 peer-hover/menu-button:text-main [&>svg]:size-16px [&>svg]:shrink-0",
                // Increases the hit area of the button on mobile.
                "after:absolute after:-inset-8px after:md:hidden",
                "peer-data-[size=sm]/menu-button:top-4px",
                "peer-data-[size=default]/menu-button:top-6px",
                // was top-2.5
                "peer-data-[size=lg]/menu-button:top-12px",
                "group-data-[collapsible=icon]:hidden",
                showOnHover &&
                    "group-focus-within/menu-item:opacity-full group-hover/menu-item:opacity-full data-[state=open]:opacity-full peer-data-[active=true]/menu-button:text-main md:opacity-zero",
                className
            )}
            {...props}
        />
    )
})
SidebarMenuAction.displayName = "SidebarMenuAction"

const SidebarMenuBadge = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        data-sidebar="menu-badge"
        className={cn(
            // was h-5, min-w-5
            "pointer-events-none absolute right-4px flex h-24px min-w-24px select-none items-center justify-center rounded-6px px-4px text-12px font-medium tabular-nums text-main",
            "peer-hover/menu-button:text-main peer-data-[active=true]/menu-button:text-main",
            "peer-data-[size=sm]/menu-button:top-4px",
            "peer-data-[size=default]/menu-button:top-6px",
            // was top-2.5
            "peer-data-[size=lg]/menu-button:top-12px",
            "group-data-[collapsible=icon]:hidden",
            className
        )}
        {...props}
    />
))
SidebarMenuBadge.displayName = "SidebarMenuBadge"

const SidebarMenuSkeleton = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div"> & {
        showIcon?: boolean
    }
>(({ className, showIcon = false, ...props }, ref) => {
    // Random width between 50 to 90%.
    const width = React.useMemo(() => {
        return `${Math.floor(Math.random() * 40) + 50}%`
    }, [])

    return (
        <div
            ref={ref}
            data-sidebar="menu-skeleton"
            className={cn("flex h-32px items-center gap-8px rounded-6px px-8px", className)}
            {...props}
        >
            {showIcon && <Skeleton className="size-16px rounded-6px" data-sidebar="menu-skeleton-icon" />}
            <Skeleton
                className="h-16px max-w-[--skeleton-width] flex-1"
                data-sidebar="menu-skeleton-text"
                style={
                    {
                        "--skeleton-width": width
                    } as React.CSSProperties
                }
            />
        </div>
    )
})
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton"

const SidebarMenuSub = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(({ className, ...props }, ref) => (
    <ul
        ref={ref}
        data-sidebar="menu-sub"
        className={cn(
            // was mx-3.5, px-2.5
            "mx-16px flex min-w-0px translate-x-1px flex-col gap-4px border-l border-main/eighth px-12px py-2px",
            "group-data-[collapsible=icon]:hidden",
            className
        )}
        {...props}
    />
))
SidebarMenuSub.displayName = "SidebarMenuSub"

const SidebarMenuSubItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(({ ...props }, ref) => (
    <li ref={ref} {...props} />
))
SidebarMenuSubItem.displayName = "SidebarMenuSubItem"

const SidebarMenuSubButton = React.forwardRef<
    HTMLAnchorElement,
    React.ComponentProps<"a"> & {
        asChild?: boolean
        size?: "sm" | "md"
        isActive?: boolean
    }
>(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "a"

    return (
        <Comp
            ref={ref}
            data-sidebar="menu-sub-button"
            data-size={size}
            data-active={isActive}
            // was h-7
            className={cn(
                "flex h-32px min-w-0px -translate-x-1px items-center gap-8px overflow-hidden rounded-6px px-8px text-main outline-none ring-accent-constant hover:bg-main/sixteenth hover:text-main focus-visible:ring-2 active:bg-main/sixteenth active:text-main disabled:pointer-events-none disabled:opacity-half aria-disabled:pointer-events-none aria-disabled:opacity-half [&>span:last-child]:truncate [&>svg]:size-16px [&>svg]:shrink-0 [&>svg]:text-main",
                "data-[active=true]:bg-main/sixteenth data-[active=true]:text-main",
                size === "sm" && "text-12px",
                size === "md" && "text-14px",
                "group-data-[collapsible=icon]:hidden",
                className
            )}
            {...props}
        />
    )
})
SidebarMenuSubButton.displayName = "SidebarMenuSubButton"

export {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInput,
    SidebarInset,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSkeleton,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
    SidebarRail,
    SidebarSeparator,
    SidebarTrigger,
    useSidebar
}