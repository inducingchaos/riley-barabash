// /**
//  * @file
//  * @author Riley Barabash <riley@rileybarabash.com>
//  *
//  * @tags
//  * #config
//  */

// import lodash from "lodash"
// import { type z, type ZodSchema } from "zod"

// /**
//  * A configuration variant for an SDKit Config.
//  */
// export interface Variant {
//     id: string
//     config: z.infer<ZodSchema>
//     middleware?: (config: z.infer<ZodSchema>) => z.infer<ZodSchema>
//     schema: ZodSchema
// }

// /**
//  * Parameters for an SDKit Config.
//  */
// export interface Params {
//     using: string | undefined
//     default: string
//     variants: Variant[]
// }

// /**
//  * A dynamic configuration helper for validating, transforming, and accessing arbitrary values.
//  */
// export class Config {
//     public config

//     constructor({ using: currentVariantId, default: defaultVariantId, variants }: Params) {
//         //  Find the current variant, and throw an error if it does not exist.

//         const currentVariant: Variant | undefined = variants.find(variant => variant.id === currentVariantId)

//         if (!currentVariant) {
//             throw new Exception(`Current config variant "${currentVariantId}" not found.`)
//         }

//         //  Find the default variant, and throw an error if it does not exist.

//         const defaultVariant: Variant | undefined = variants.find(variant => variant.id === defaultVariantId)

//         if (!defaultVariant) {
//             throw new Exception(`Default config variant "${defaultVariantId}" not found.`)
//         }

//         //  Process each variant.

//         variants.forEach(variant => {
//             //  Parse the variant configuration using its schema.

//             variant.config = variant.schema.parse(variant.config)

//             //  Transform the variant configuration using its middleware.

//             if (variant.middleware) {
//                 variant.config = variant.middleware(variant.config)
//             }

//             //  Merge each variant with the default variant configuration.

//             if (variant.id !== defaultVariantId) {
//                 variant.config = lodash.merge({}, defaultVariant.config, variant.config)
//             }
//         })

//         //  Merge the default variant values with the rest of the config variants.

//         this.config = {
//             ...currentVariant.config,
//             ...variants.map(variant => variant.config)
//         }
//     }
// }

// //  Export the configuration modules.

// export * from "./brand"

// // //  EXAMPLE IMPLEMENTATION

// // /* In "~/config/brand/index.ts". */

// // import { Config } from ".."

// // import _private from "./private"
// // import _public from "./public"

// // export const brand = new Config({
// //     using: "public",
// //     default: "private",
// //     variants: [_private, _public]
// // })

// // /* In "~/config/brand/private/index.ts". */

// // import type { Variant } from "~/config"
// // import { middleware } from "./middleware"
// // import { schema, type Config } from "./schema"

// // const config = {
// //     name: "RILEY BARABASH",
// //     username: "inducingchaos",
// //     tagline: "Engineering self, designing systems, scaling precision.",
// //     emails: {
// //         personal: "riley@rileybarabash.com",
// //         support: "support@rileybarabash.com"
// //     },
// //     urls: {
// //         site: "https://rileybarabash.com",
// //         discord: "https://discord.gg/inducingchaos",
// //         github: "https://github.com/inducingchaos",
// //         x: "https://x.com/inducingchaos",
// //         instagram: "https://instagram.com/inducingchaos",
// //         youtube: "https://youtube.com/inducingchaos",
// //         tiktok: "https://tiktok.com/inducingchaos"
// //     },
// //     age: 20,
// //     location: "Edmonton, AB"
// // } satisfies Config

// // export default {
// //     id: "private",
// //     config,
// //     middleware,
// //     schema
// // } satisfies Variant

// // /* In "~/config/brand/private/middleware.ts". */

// // import type { Config } from "./schema"

// // export function middleware(brand: Config): Config {
// //     if (brand.age !== 20) {
// //         brand.age = 20
// //     }

// //     return brand
// // }

// // /* In "~/config/brand/private/schema.ts". */

// // import { z } from "zod"

// // export const schema = z.object({
// //     name: z.string(),
// //     username: z.string(),
// //     tagline: z.string(),

// //     emails: z.object({
// //         personal: z.string().email().optional(),
// //         support: z.string().email()
// //     }),

// //     urls: z.object({
// //         site: z.string().url(),
// //         discord: z.string().url(),
// //         github: z.string().url(),
// //         x: z.string().url(),
// //         instagram: z.string().url(),
// //         youtube: z.string().url(),
// //         tiktok: z.string().url()
// //     }),

// //     age: z.number().int().min(18),
// //     location: z.string()
// // })

// // export type Config = z.infer<typeof schema>

// // /* In "~/config/brand/public/index.ts". */

// // import type { Variant } from "~/config"
// // import { schema, type Config } from "./schema"

// // const config = {
// //     emails: {
// //         personal: undefined
// //     }
// // } satisfies Config

// // export default {
// //     id: "public",
// //     config,
// //     schema
// // } satisfies Variant

// // /* In "~/config/brand/public/schema.ts". */

// // import { z } from "zod"
// // import { schema as privateSchema } from "../private/schema"

// // export const schema = privateSchema.pick({}).extend({
// //     emails: z.object({
// //         personal: z.string().optional()
// //     })
// // })

// // export type Config = z.input<typeof schema>
