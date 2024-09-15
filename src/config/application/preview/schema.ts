/**
 *
 */

import { z } from "zod"

export const schema = z.object({})

export type Config = z.input<typeof schema>
