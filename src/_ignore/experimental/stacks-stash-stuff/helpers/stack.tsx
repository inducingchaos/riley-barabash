// /**
//  * @file A container component for composing dynamic flex layouts.
//  * @author Riley Barabash <riley@rileybarabash.com>
//  *
//  * @tags
//  * #src
//  * #components
//  * #ui
//  * #layout
//  * #helpers
//  * #stack
//  */

// "use client"

// import { merge } from "lodash"
// import { customAlphabet } from "nanoid"
// import { nolookalikes } from "nanoid-dictionary"
// import {
//     Children,
//     cloneElement,
//     type ComponentPropsWithoutRef,
//     type ElementType,
//     type HTMLAttributes,
//     isValidElement,
//     type ReactNode,
//     useEffect,
//     useMemo
// } from "react"
// import { application } from "~/config"
// import { findOptionSetKey, type GetOptionTypes, type OptionSetGroup } from "~/_ignore/experimental/stacks-stash-stuff/iterables"
// import { cn } from "~/utils/ui"

// //  Extract to /config/theme/index.ts. Also has presets. In motion.timingFunctions.

// //  As easeOut.

// export const easeOutExpoTimingFunction = "cubic-bezier(0.125, 1.0, 0.25, 1.0)"

// //  As easeInOut.

// export const easeInOutExpoTimingFunction = "cubic-bezier(0.875, 0.0, 0.125, 1.0)"

// //  To some util folder.

// export interface GenerateHslaCssColorOptions {
//     hue?: number
//     saturation?: number
//     lightness?: number
//     alpha?: number
// }

// export function generateHslaCssColor(options?: GenerateHslaCssColorOptions): string {
//     const {
//         hue = Math.random() * 360,
//         saturation = Math.random(),
//         lightness = Math.random(),
//         alpha = Math.random()
//     } = options ?? {}

//     return `hsla(${hue % 360}, ${Math.min(saturation, 1) * 100}%, ${Math.min(lightness, 1) * 100}%, ${Math.min(alpha, 1)})`
// }

// //  Keep.

// const positionGroups = {
//     start: ["top", "left"],
//     center: ["center"],
//     end: ["bottom", "right"]
// } as const satisfies OptionSetGroup

// type PositionGroup = keyof typeof positionGroups
// type PositionGroupOption = GetOptionTypes<typeof positionGroups>

// const verticalPositions = ["top", "bottom"] as const
// type VerticalPosition = (typeof verticalPositions)[number]

// const horizontalPositions = ["left", "right"] as const
// type HorizontalPosition = (typeof horizontalPositions)[number]

// type Position = VerticalPosition | HorizontalPosition | "center" | `${VerticalPosition}-${HorizontalPosition}`

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// type Justification = `justify-${Spacing}`
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// type Alignment = `items-${PositionGroup}`
// type Spacing = PositionGroup | "between" | "around" | "evenly" | "none"

// //  Keep.

// export interface StackOptions<Element extends ElementType = "div"> extends HTMLAttributes<HTMLElement> {
//     label?: string
//     as?: Element
//     orientation?: "horizontal" | "vertical"
//     alignment?: Position
//     spacing?: "between" | "around" | "even" | "none"
//     fill?: boolean
//     shrink?: boolean
//     debug?: boolean | StackDebugOptions
//     children: ReactNode
// }

// export interface StackDebugOptions {
//     styles?: {
//         primaryColor?: string
//         secondaryColor?: string
//         borderWidth?: number
//         transitionTimingFunction?: string
//         focusTransitionDuration?: number
//         labelHideTransitionDuration?: number
//         labelHideTransitionDelay?: number
//     }
//     options?: {
//         logs?: boolean
//         verbose?: boolean
//         ui?: boolean
//     }
//     propagation?: {
//         styles?: boolean
//         options?: boolean
//     }
// }

// type InternalStackOptions<Element extends ElementType = "div"> = StackOptions<Element> & {
//     propagatedDebugConfig?: StackDebugOptions
//     parent?: {
//         label: string
//         debug: boolean
//     }
// }

// //  Do I need `& Omit<ComponentPropsWithoutRef<Element>, keyof StackOptions<Element>>`? What do they do? Should I use InternalStackOptions here, or not if I don't want it to be visible?

// function Stack<Element extends ElementType = "div">({
//     label,
//     as: elementType,
//     orientation = "vertical",
//     alignment = "center",
//     spacing = "none",
//     fill = true,
//     shrink = true,
//     debug: providedDebugConfig = false,
//     propagatedDebugConfig,
//     parent,
//     className,
//     children,
//     ...props
// }: InternalStackOptions<Element> & Omit<ComponentPropsWithoutRef<Element>, keyof StackOptions<Element>>): JSX.Element {
//     label = label ?? `Stack ID: ${customAlphabet(nolookalikes, 4)().slice(-4)}`
//     const Component = elementType ?? "div"

//     //  After `isDebugEnabled` is set, we assert that `providedDebugConfig` is an object (so that we can access it without type errors).

//     const isDebugEnabled: boolean = typeof providedDebugConfig === "boolean" ? providedDebugConfig : true
//     if (typeof providedDebugConfig === "boolean") providedDebugConfig = providedDebugConfig as unknown as StackDebugOptions

//     /**
//      * A random hue value between 0 and 360 degrees, rounded to the nearest 30-degree increment for generating consistent color variations.
//      */

//     const randomHueInterval: number = Math.round(Math.random() * 12) * 30

//     // Get HSLA formatted color
//     const randomColor: string

//     const defaultDebugConfig: Required<StackDebugOptions> = {
//         styles: {
//             primaryColor: `hsl(${randomHueInterval}, 100%, 50%, 1)`,
//             secondaryColor: `hsl(${randomHueInterval}, 100%, 50%, 0.25)`,
//             borderWidth: 2,
//             transitionTimingFunction: easeInOutExpoTimingFunction,
//             focusTransitionDuration: 0.25,
//             labelHideTransitionDuration: 0.25,
//             labelHideTransitionDelay: 2
//         },
//         options: {
//             logs: true,
//             verbose: false,
//             ui: true
//         },
//         propagation: {
//             styles: false,
//             options: true
//         }
//     }

//     /**
//      * A debug configuration derived from the merging of the provided debug configuration and the propagated debug configuration.
//      */
//     const amalgamatedDebugConfig: StackDebugOptions = {
//         styles:
//             (propagatedDebugConfig?.propagation?.styles ?? defaultDebugConfig.propagation.styles)
//                 ? {
//                       primaryColor: providedDebugConfig.styles?.primaryColor ?? propagatedDebugConfig?.styles?.primaryColor,
//                       secondaryColor:
//                           providedDebugConfig.styles?.secondaryColor ?? propagatedDebugConfig?.styles?.secondaryColor,
//                       borderWidth: providedDebugConfig.styles?.borderWidth ?? propagatedDebugConfig?.styles?.borderWidth,
//                       transitionTimingFunction:
//                           providedDebugConfig.styles?.transitionTimingFunction ??
//                           propagatedDebugConfig?.styles?.transitionTimingFunction,
//                       focusTransitionDuration:
//                           providedDebugConfig.styles?.focusTransitionDuration ??
//                           propagatedDebugConfig?.styles?.focusTransitionDuration,
//                       labelHideTransitionDuration:
//                           providedDebugConfig.styles?.labelHideTransitionDuration ??
//                           propagatedDebugConfig?.styles?.labelHideTransitionDuration,
//                       labelHideTransitionDelay:
//                           providedDebugConfig.styles?.labelHideTransitionDelay ??
//                           propagatedDebugConfig?.styles?.labelHideTransitionDelay
//                   }
//                 : providedDebugConfig.styles,
//         options:
//             (propagatedDebugConfig?.propagation?.options ?? defaultDebugConfig.propagation.options)
//                 ? {
//                       logs: providedDebugConfig.options?.logs ?? propagatedDebugConfig?.options?.logs,
//                       verbose: providedDebugConfig.options?.verbose ?? propagatedDebugConfig?.options?.verbose,
//                       ui: providedDebugConfig.options?.ui ?? propagatedDebugConfig?.options?.ui
//                   }
//                 : providedDebugConfig.options,
//         propagation: {
//             styles: providedDebugConfig.propagation?.styles ?? propagatedDebugConfig?.propagation?.styles,
//             options: providedDebugConfig.propagation?.options ?? propagatedDebugConfig?.propagation?.options
//         }
//     }

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     const debugConfig: Required<StackDebugOptions> = {
//         styles: merge({}, defaultDebugConfig.styles, amalgamatedDebugConfig.styles),
//         options: merge({}, defaultDebugConfig.options, amalgamatedDebugConfig.options),
//         propagation: merge({}, defaultDebugConfig.propagation, amalgamatedDebugConfig.propagation)
//     }

//     debugConfig.propagation = debugConfig.propagation ?? {}

//     /*

//     We should pass the parent debug config as parent.debugConfig.

//     THE ONE PASSED SHOULD NOT BE FUCKED WITH, EACH COMP CAN FUCK WITH IT INDIVIDUALLY.
//     PASS INITIAL.

//     So vars we have:

//     - parent.debugConfig

//     Then `parent.debug` is whether or not the parent debug mode is enabled.

//     Prop settings should

//     */

//     const propagateStyles: boolean = debugConfig.propagation.styles
//     const propagateOptions: boolean = debugConfig.propagation.options

//     debugConfig.styles = debugConfig.styles ?? {}
//     debugConfig.styles.primaryColor =
//         debugConfig.styles.primaryColor ??
//         (propagateStyles ? parent?.debugConfig?.styles?.primaryColor : undefined) ??
//         `hsl(${randomSegmentedHue}, 100%, 50%, 1)`
//     debugConfig.styles.secondaryColor =
//         debugConfig.styles.secondaryColor ??
//         (propagateStyles ? parent?.debugConfig?.styles?.secondaryColor : undefined) ??
//         `hsl(${randomSegmentedHue}, 100%, 50%, 0.25)`
//     debugConfig.styles.borderWidth =
//         debugConfig.styles.borderWidth ?? (propagateStyles ? parent?.debugConfig?.styles?.borderWidth : undefined) ?? 2
//     debugConfig.styles.transitionTimingFunction =
//         debugConfig.styles.transitionTimingFunction ??
//         (propagateStyles ? parent?.debugConfig?.styles?.transitionTimingFunction : undefined) ??
//         `${easeInOutExpoTimingFunction}`
//     debugConfig.styles.focusTransitionDuration =
//         debugConfig.styles.focusTransitionDuration ??
//         (propagateStyles ? parent?.debugConfig?.styles?.focusTransitionDuration : undefined) ??
//         0.25
//     debugConfig.styles.labelHideTransitionDuration =
//         debugConfig.styles.labelHideTransitionDuration ??
//         (propagateStyles ? parent?.debugConfig?.styles?.labelHideTransitionDuration : undefined) ??
//         0.25
//     debugConfig.styles.labelHideTransitionDelay =
//         debugConfig.styles.labelHideTransitionDelay ??
//         (propagateStyles ? parent?.debugConfig?.styles?.labelHideTransitionDelay : undefined) ??
//         2

//     debugConfig.options = debugConfig.options ?? {}
//     debugConfig.options.logs =
//         debugConfig.options.logs ?? (propagateOptions ? parent?.debugConfig?.options?.logs : undefined) ?? isDebugEnabled
//     debugConfig.options.verbose = debugConfig.options.verbose ?? (propagateOptions && parent?.debugConfig?.options?.verbose)
//     debugConfig.options.ui = debugConfig.options.ui ?? (propagateOptions ? parent?.debugConfig?.options?.ui : undefined)

//     // if (debugConfig.options.logs) {
//     console.log(`${label} - debug.options.ui:`, debugConfig.options.ui, "| Determined by:", {
//         debug: isDebugEnabled,
//         propagateOptions,
//         parentDebugConfig: parent?.debugConfig?.options?.ui
//     })
//     // }

//     const cssVariables = {
//         "--stack-debug-primary-color": debugConfig.styles.primaryColor,
//         "--stack-debug-secondary-color": debugConfig.styles.secondaryColor,
//         "--stack-debug-border-width": `${debugConfig.styles.borderWidth}px`,
//         "--stack-debug-transition-timing-function": debugConfig.styles.transitionTimingFunction,
//         "--stack-debug-focus-transition-duration": `${debugConfig.styles.focusTransitionDuration}s`,
//         "--stack-debug-label-hide-transition-duration": `${debugConfig.styles.labelHideTransitionDuration}s`,
//         "--stack-debug-label-hide-transition-delay": `${debugConfig.styles.labelHideTransitionDelay}s`
//     } satisfies Record<string, string>

//     const layout = useMemo(() => {
//         const verticalPosition = alignment.includes("-")
//             ? findOptionSetKey(alignment.split("-")[0] as PositionGroupOption, positionGroups)
//             : verticalPositions.includes(alignment as VerticalPosition)
//               ? findOptionSetKey(alignment as PositionGroupOption, positionGroups)
//               : "center"

//         const horizontalPosition = alignment.includes("-")
//             ? findOptionSetKey(alignment.split("-")[1] as PositionGroupOption, positionGroups)
//             : horizontalPositions.includes(alignment as HorizontalPosition)
//               ? findOptionSetKey(alignment as PositionGroupOption, positionGroups)
//               : "center"

//         const justification = orientation === "horizontal" ? horizontalPosition : verticalPosition
//         const alignmentValue = orientation === "horizontal" ? verticalPosition : horizontalPosition
//         const spacingValue = spacing === "even" ? "evenly" : spacing !== "none" ? spacing : justification

//         return {
//             positions: {
//                 vertical: verticalPosition,
//                 horizontal: horizontalPosition
//             },
//             justification: justification,
//             alignment: alignmentValue,
//             spacing: spacingValue,
//             classNames: {
//                 justify: `justify-${spacingValue}`,
//                 items: `items-${alignmentValue}`
//             }
//         }
//     }, [alignment, orientation, spacing])

//     useEffect(() => {
//         if (debugConfig.options?.logs) {
//             const style: string = `background-color: ${debugConfig.styles?.primaryColor}; color: white; padding: 2px 8px; border-radius: 0px;`

//             console.log(`%c${label}`, style, {
//                 type: `<${Component as string}>`,
//                 orientation,
//                 alignment,
//                 spacing,
//                 fill,
//                 shrink,
//                 layout,
//                 debug: debugConfig,
//                 className,
//                 componentProps: debugConfig.options.verbose && props
//             })
//         }
//     }, [debugConfig, label, Component, orientation, alignment, fill, shrink, spacing, layout, props, isDebugEnabled, className])

//     const childrenWithProps = Children.map(children, child => {
//         if (isValidElement(child))
//             return cloneElement(child, {
//                 parent: {
//                     label,
//                     debug: isDebugEnabled
//                 },
//                 propagatedDebugConfig: amalgamatedDebugConfig
//             } as Partial<typeof child.props> & {
//                 parent: {
//                     label: string
//                     debug: boolean
//                 }
//                 propagatedDebugConfig: StackDebugOptions
//             })

//         return child
//     })

//     return (
//         <Component
//             className={cn(
//                 "relative flex min-h-0px min-w-0px",
//                 fill ? "h-full w-full flex-1" : "flex-initial",
//                 shrink ? "flex-shrink" : "flex-shrink-0",
//                 orientation === "horizontal" ? "flex-row" : "flex-col",
//                 layout.classNames.justify,
//                 layout.classNames.items,
//                 debugConfig.options.ui && "stack-debug",
//                 className
//             )}
//             style={{
//                 ...(debugConfig.options.ui && cssVariables),
//                 ...props.style
//             }}
//             {...props}
//             suppressHydrationWarning
//         >
//             {childrenWithProps}
//             {debugConfig.options.ui && (
//                 <div
//                     className="stack-debug-label text-background font-mono"
//                     style={{
//                         position: "absolute",
//                         bottom: 0,
//                         left: 0,
//                         padding: "2px 8px",
//                         fontSize: "10px",
//                         opacity: 1
//                     }}
//                     suppressHydrationWarning
//                 >
//                     {label}
//                 </div>
//             )}
//         </Component>
//     )
// }

// // Modify the ConfiguredStack function
// function ConfiguredStack<Element extends ElementType = "div">(
//     props: InternalStackOptions<Element> & Omit<ComponentPropsWithoutRef<Element>, keyof StackOptions<Element>>
// ): JSX.Element {
//     // Use prop splitting to separate propagatedDebugConfig and parent from other props
//     const { debug, ...restProps } = props as InternalStackOptions<Element>

//     return <Stack {...restProps} debug={application.settings.debug.ui ? debug : false} />
// }

// export { ConfiguredStack as Stack }
