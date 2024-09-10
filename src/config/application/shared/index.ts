/**
 * @file The shared app configuration.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #config
 * #application
 * #zod
 * #shared
 * #environment
 */

import { middleware } from "./middleware"
import { type Config, schema } from "./schema"

const config = {
    settings: {
        flags: {
            vercel: process.env.VERCEL
        }
    },

    routing: {
        urls: {
            base: "https://rileybarabash.com",
            vercel: process.env.VERCEL_URL
        },
        paths: {
            pages: {
                legal: {
                    privacyPolicy: "/privacy",
                    termsOfService: "/terms"
                },
                auth: {
                    callback: "/"
                }
            },
            api: {
                infra: "/api/infra",
                trpc: "/api/infra/rpc"
            }
        }
    },

    credentials: {
        public: {
            twilio: {
                account: process.env.TWILIO_ACCOUNT,
                number: process.env.TWILIO_NUMBER
            },
            database: {
                name: process.env.DATABASE_NAME,
                host: process.env.DATABASE_HOST,
                username: process.env.DATABASE_USERNAME
            }
        },
        private: {
            internal: {
                secret: process.env.INTERNAL_SECRET
            },
            database: {
                password: process.env.DATABASE_PASSWORD
            },
            twilio: {
                secret: process.env.TWILIO_SECRET
            }
        }
    }
} satisfies Config

export default {
    config,
    middleware,
    schema
}
