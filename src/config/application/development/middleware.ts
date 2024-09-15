/**
 *
 */

import type { Config } from "./schema"

export function middleware(application: Config): Config {
    if (!application.settings.port) application.settings.port = Number(process.env.PORT ?? 3000)

    if (!application.routing.urls.base) application.routing.urls.base = `http://localhost:${application.settings.port}`

    return application
}
