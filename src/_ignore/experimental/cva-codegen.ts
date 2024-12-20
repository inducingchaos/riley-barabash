// //  OTHER FILE

// type VariantKeys<T> = {
//     [K in keyof T]: keyof T[K]
// }

// type VariantOption<T> = {
//     [K in keyof T]: VariantKeys<T>[K]
// }

// type GeneratorReturn<T> = {
//     [K in VariantKeys<T>[keyof T]]?: {
//         [I in VariantKeys<T>[keyof T]]?: string
//     }
// }

// type CodegenOptions<T extends Record<string, Record<string, unknown>>> = {
//     variants: T
//     generator: (variant: VariantOption<T>) => GeneratorReturn<T>
// }

// const CODEGEN_cvaCompoundVariants = <T extends Record<string, Record<string, unknown>>>({}: CodegenOptions<T>) => undefined

// //
// //
// //
// //

// CODEGEN_cvaCompoundVariants({
//     variants,
//     generator: variant => {
//         const isAccent = variant.color === "accent" ? "-neutral" : ""

//         return {
//             fill: {
//                 full: `bg-${variant.color}${isAccent} text-alternate hover:bg-${variant.color}${isAccent}/-quarter`,
//                 reduced: `bg-${variant.color}${isAccent}/eighth text-${variant.color}${isAccent} hover:bg-${variant.color}${isAccent}/sixteenth`
//             },
//             outline: {
//                 full: `border-${variant.color}${isAccent} text-${variant.color}${isAccent} hover:bg-${variant.color}${isAccent} hover:text-alternate`,
//                 reduced: `border-${variant.color}${isAccent}/eighth text-${variant.color}${isAccent} hover:border-${variant.color}${isAccent}/zero hover:bg-${variant.color}${isAccent}/eighth`
//             },
//             ghost: {
//                 full: `text-${variant.color}${isAccent} hover:bg-${variant.color}${isAccent} hover:text-alternate`,
//                 reduced: `hover:bg-${variant.color}${isAccent}/eighth text-${variant.color}${isAccent}`
//             },
//             link: {
//                 full: `text-${variant.color}${isAccent} hover:text-${variant.color}${isAccent}/-quarter`,
//                 reduced: `text-${variant.color}${isAccent}/half hover:text-${variant.color}${isAccent}/3-8`
//             }
//         }
//     }
// })

// use ts-morph to inject cvaCompoundVariants into variants maybe
