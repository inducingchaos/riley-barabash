/**
 *
 */

import { ConfigError } from "~/errors"
import { onServer, onVercel } from "~/utils/conditions"
import type { Config } from "./schema"

export function middleware(application: Config): Config {
    if (onServer) {
        if (!application.credentials.private.internal.secret)
            throw new ConfigError({
                name: "ENVIRONMENT_VARIABLE_NOT_FOUND",
                message: "You forgot to configure the `INTERNAL_SECRET` environment variable."
            })

        if (!application.credentials.public.database.name)
            throw new ConfigError({
                name: "ENVIRONMENT_VARIABLE_NOT_FOUND",
                message: "You forgot to configure the `DATABASE_NAME` environment variable."
            })

        if (!application.credentials.public.database.host)
            throw new ConfigError({
                name: "ENVIRONMENT_VARIABLE_NOT_FOUND",
                message: "You forgot to configure the `DATABASE_HOST` environment variable."
            })

        if (!application.credentials.public.database.username)
            throw new ConfigError({
                name: "ENVIRONMENT_VARIABLE_NOT_FOUND",
                message: "You forgot to configure the `DATABASE_USERNAME` environment variable."
            })

        if (!application.credentials.private.database.password)
            throw new ConfigError({
                name: "ENVIRONMENT_VARIABLE_NOT_FOUND",
                message: "You forgot to configure the `DATABASE_PASSWORD` environment variable."
            })

        if (!application.credentials.public.twilio.account)
            throw new ConfigError({
                name: "ENVIRONMENT_VARIABLE_NOT_FOUND",
                message: "You forgot to configure the `TWILIO_ACCOUNT` environment variable."
            })

        if (!application.credentials.public.twilio.number)
            throw new ConfigError({
                name: "ENVIRONMENT_VARIABLE_NOT_FOUND",
                message: "You forgot to configure the `TWILIO_NUMBER` environment variable."
            })

        if (!application.credentials.private.twilio.secret)
            throw new ConfigError({
                name: "ENVIRONMENT_VARIABLE_NOT_FOUND",
                message: "You forgot to configure the `TWILIO_SECRET` environment variable."
            })

        if (!application.credentials.private.resend.secret)
            throw new ConfigError({
                name: "ENVIRONMENT_VARIABLE_NOT_FOUND",
                message: "You forgot to configure the `RESEND_SECRET` environment variable."
            })

        if (application.settings.flags.database.useTestBranch === "true") {
            if (!process.env.TEST_DATABASE_NAME)
                throw new ConfigError({
                    name: "ENVIRONMENT_VARIABLE_NOT_FOUND",
                    message: "You forgot to configure the `TEST_DATABASE_NAME` environment variable."
                })

            if (!process.env.TEST_DATABASE_HOST)
                throw new ConfigError({
                    name: "ENVIRONMENT_VARIABLE_NOT_FOUND",
                    message: "You forgot to configure the `TEST_DATABASE_HOST` environment variable."
                })

            if (!process.env.TEST_DATABASE_USERNAME)
                throw new ConfigError({
                    name: "ENVIRONMENT_VARIABLE_NOT_FOUND",
                    message: "You forgot to configure the `TEST_DATABASE_USERNAME` environment variable."
                })

            if (!process.env.TEST_DATABASE_PASSWORD)
                throw new ConfigError({
                    name: "ENVIRONMENT_VARIABLE_NOT_FOUND",
                    message: "You forgot to configure the `TEST_DATABASE_PASSWORD` environment variable."
                })

            application.credentials.public.database.name = process.env.TEST_DATABASE_NAME
            application.credentials.public.database.host = process.env.TEST_DATABASE_HOST
            application.credentials.public.database.username = process.env.TEST_DATABASE_USERNAME
            application.credentials.private.database.password = process.env.TEST_DATABASE_PASSWORD
        }
    }

    if (!application.routing.urls.base) {
        if (onVercel(application)) application.routing.urls.base = `https://${application.routing.urls.vercel}`
        else
            throw new ConfigError({
                name: "MISSING_CONFIG_VALUE",
                message: "You forgot to configure the `BASE_URL` config value."
            })
    }

    return application
}
