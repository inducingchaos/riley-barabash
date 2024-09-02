/**
 * @file The preview app configuration schema.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #config
 * #zod
 * #preview
 * #schema
 * #application
 */

import { z } from "zod"

export const schema = z.object({})

export type Config = z.input<typeof schema>
