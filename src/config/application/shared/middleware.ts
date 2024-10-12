/**
 *
 */

import { onServer, onVercel } from "~/utils/conditions"
import type { Config } from "./schema"
import { Exception } from "~/meta"

export function middleware(application: Config): Config {
    if (onServer) {
        const requiredVariables = {
            INTERNAL_SECRET: application.credentials.private.internal.secret,
            DATABASE_NAME: application.credentials.public.database.name,
            DATABASE_HOST: application.credentials.public.database.host,
            DATABASE_USERNAME: application.credentials.public.database.username,
            DATABASE_PASSWORD: application.credentials.private.database.password,
            TWILIO_ACCOUNT: application.credentials.public.twilio.account,
            TWILIO_NUMBER: application.credentials.public.twilio.number,
            TWILIO_SECRET: application.credentials.private.twilio.secret,
            RESEND_SECRET: application.credentials.private.resend.secret
        }

        for (const [varName, value] of Object.entries(requiredVariables)) {
            if (!value) {
                throw new Exception({
                    in: "config",
                    of: "missing-environment-variable",
                    with: {
                        internal: {
                            label: "Missing Environment Variable",
                            message: `You forgot to configure the \`${varName}\` environment variable.`
                        }
                    }
                })
            }
        }

        if (application.settings.flags.database.useTestBranch === "true") {
            const requiredTestVariables = {
                TEST_DATABASE_NAME: process.env.TEST_DATABASE_NAME,
                TEST_DATABASE_HOST: process.env.TEST_DATABASE_HOST,
                TEST_DATABASE_USERNAME: process.env.TEST_DATABASE_USERNAME,
                TEST_DATABASE_PASSWORD: process.env.TEST_DATABASE_PASSWORD
            }

            for (const [varName, value] of Object.entries(requiredTestVariables)) {
                if (!value) {
                    throw new Exception({
                        in: "config",
                        of: "missing-environment-variable",
                        with: {
                            internal: {
                                label: "Missing Environment Variable",
                                message: `You forgot to configure the \`${varName}\` environment variable.`
                            }
                        }
                    })
                }
            }

            application.credentials.public.database.name = process.env.TEST_DATABASE_NAME
            application.credentials.public.database.host = process.env.TEST_DATABASE_HOST
            application.credentials.public.database.username = process.env.TEST_DATABASE_USERNAME
            application.credentials.private.database.password = process.env.TEST_DATABASE_PASSWORD
        }
    }

    if (!application.routing.urls.base) {
        if (onVercel(application)) application.routing.urls.base = `https://${application.routing.urls.vercel}`
        else
            throw new Exception({
                in: "config",
                of: "missing-value",
                with: {
                    internal: {
                        label: "Missing Base URL",
                        message: "You forgot to configure the `BASE_URL` config value."
                    }
                }
            })
    }

    return application
}
