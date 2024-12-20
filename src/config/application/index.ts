/**
 * @remarks
 * - To set or override the current environment, adjust the `NEXT_PUBLIC_ENVIRONMENT` variable in the '.env' file. This value must be set everywhere the application is running.
 * - To access configuration values for a specific environment, use `application.<environment>`.
*
* @todo
* - [P3] Create custom errors for Zod validation.
* - [P4] Extract into an API that's easier to use - see "~/_archived/config.ts".
* - [P4] Fix if still applicable: https://chatgpt.com/c/8456d4d1-34d8-4d23-89c1-054d9c23e23f.
*/

/* eslint-disable import/no-named-as-default-member */

import merge from "lodash/merge"
import type { Environment } from "~/types"
import development from "./development"
import preview from "./preview"
import production from "./production"
import shared from "./shared"
import { Exception } from "~/meta"

const parsedConfig = {
    shared: shared.schema.parse(shared.config),
    development: development.schema.parse(development.config),
    preview: preview.schema.parse(preview.config),
    production: production.schema.parse(production.config)
}

const transformedConfig = {
    shared: shared.middleware(parsedConfig.shared),
    development: development.middleware(parsedConfig.development),
    preview: preview.middleware(parsedConfig.preview),
    production: production.middleware(parsedConfig.production)
}

//  Merge all config variants with the default config except for the default variant itself.

const mergedConfig = {
    shared: transformedConfig.shared,
    development: merge({}, transformedConfig.shared, transformedConfig.development),
    preview: merge({}, transformedConfig.shared, transformedConfig.preview),
    production: merge({}, transformedConfig.shared, transformedConfig.production)
}

if (!process.env.NEXT_PUBLIC_ENVIRONMENT)
    throw new Exception({
        in: "config",
        of: "missing-environment-variable",
        with: {
            internal: {
                label: "Missing Environment Variable",
                message: "You forgot to configure the `NEXT_PUBLIC_ENVIRONMENT` environment variable."
            }
        }
    })

const environment = process.env.NEXT_PUBLIC_ENVIRONMENT as Environment

export const application = {
    ...mergedConfig[environment],
    ...mergedConfig,
    environment
}

export type Application = typeof application
