/**
 *
 */

import { type z } from "zod"
import shared from "../shared"

export const schema = shared.schema
    .pick({
        credentials: true
    })
    .extend({
        credentials: shared.schema.shape.credentials
            .pick({
                public: true,
                private: true
            })
            .extend({
                public: shared.schema.shape.credentials.shape.public.pick({
                    database: true
                }),
                private: shared.schema.shape.credentials.shape.private.pick({
                    database: true
                })
            })
    })

export type Config = z.input<typeof schema>
