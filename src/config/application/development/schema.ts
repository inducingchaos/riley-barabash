/**
 *
 */

import { type z } from "zod"
import shared from "../shared"

export const schema = shared.schema
    .pick({
        settings: true,
        routing: true
    })
    .extend({
        settings: shared.schema.shape.settings.pick({ port: true }),
        routing: shared.schema.shape.routing
            .pick({
                urls: true
            })
            .extend({
                urls: shared.schema.shape.routing.shape.urls.pick({
                    base: true
                })
            })
    })

export type Config = z.input<typeof schema>
