/**
 * @file The shared app configuration schema.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #application
 * #config
 * #validation
 * #schema
 * #zod
 * #shared
 *
 * @remarks
 * - Always make environment variables optional and validate them in middleware on the server (do an environment check).
 */

import { z } from "zod"

export const schema = z.object({
    settings: z.object({
        port: z.number().optional(),
        flags: z.object({
            vercel: z.string().optional()
        })
    }),

    routing: z.object({
        urls: z.object({
            base: z.string().url().optional(),
            vercel: z.string().optional()
        }),
        paths: z.object({
            pages: z.object({
                legal: z.object({
                    privacyPolicy: z.string(),
                    termsOfService: z.string()
                }),
                auth: z.object({
                    callback: z.string()
                })
            }),
            api: z.object({
                infra: z.string(),
                trpc: z.string()
            })
        })
    }),

    credentials: z.object({
        public: z.object({
            twilio: z.object({
                account: z.string().optional(),
                number: z.string().optional()
            }),
            database: z.object({
                name: z.string().optional(),
                host: z.string().optional(),
                username: z.string().optional()
            })
        }),

        private: z.object({
            internal: z.object({
                secret: z.string().optional()
            }),
            database: z.object({
                password: z.string().optional()
            }),
            twilio: z.object({
                secret: z.string().optional()
            }),
            resend: z.object({
                secret: z.string().optional()
            })
        })
    })
})

export type Config = z.input<typeof schema>
