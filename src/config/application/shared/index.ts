/**
 *
 */

import { middleware } from "./middleware"
import { type Config, schema } from "./schema"

const config = {
    settings: {
        flags: {
            vercel: process.env.VERCEL,
            database: {
                filterTables: process.env.FILTER_DATABASE_TABLES,
                useTestBranch: process.env.USE_DATABASE_TEST_BRANCH
            }
        }
    },

    routing: {
        urls: {
            base: "https://rileybarabash.com",
            vercel: process.env.VERCEL_URL
        },
        paths: {
            pages: {
                auth: {
                    signIn: "/sign-in",
                    signUp: "/sign-up",
                    forgotPassword: "/sign-in/forgot-password"
                },

                legal: {
                    privacyPolicy: "/privacy",
                    termsOfService: "/terms"
                }
            },
            api: {
                infra: "/api/infra",
                trpc: "/api/infra/rpc",
                auth: {
                    oauth: {
                        apple: "/api/auth/apple",
                        google: "/api/auth/google"
                    }
                }
            },

            callbacks: {
                auth: {
                    signIn: "/",
                    signOut: "/"
                }
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
            },
            resend: {
                secret: process.env.RESEND_SECRET
            }
        }
    }
} satisfies Config

export default {
    config,
    middleware,
    schema
}
