/**
 *
 */

import { middleware } from "./middleware"
import { schema, type Config } from "./schema"

export const config = {
    credentials: {
        public: {
            database: {
                name: process.env.DATABASE_NAME,
                host: process.env.DATABASE_HOST,
                username: process.env.DATABASE_USERNAME
            }
        },
        private: {
            database: {
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
