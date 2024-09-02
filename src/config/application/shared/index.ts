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
            pages: {},
            api: {
                infra: "/api/infra",
                trpc: "/api/infra/rpc"
            }
        }
    },

    credentials: {
        public: {},
        private: {
            internal: process.env.INTERNAL_SECRET_KEY,
            database: {
                name: process.env.DATABASE_NAME,
                host: process.env.DATABASE_HOST,
                username: process.env.DATABASE_USERNAME,
                password: process.env.DATABASE_PASSWORD
            }
        }
    }
} satisfies Config

export default {
    config,
    middleware,
    schema
}
