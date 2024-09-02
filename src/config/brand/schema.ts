/**
 * @file The schema for the brand config.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #config
 * #brand
 * #schema
 */

import { z } from "zod"

export const schema = z.object({
    info: z.object({
        name: z.string(),
        tagline: z.string(),
        description: z.string()
    }),

    emails: z.object({
        admin: z.string().email(),
        personal: z.string().email(),
        support: z.string().email()
    }),

    links: z.object({
        site: z.string().url(),
        x: z.string().url(),
        instagram: z.string().url(),
        tiktok: z.string().url(),
        github: z.string().url()
    })
})

export type Config = z.input<typeof schema>
