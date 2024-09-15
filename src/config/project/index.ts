/**
 *
 */

import { ConfigError } from "~/errors"
import type { Project as ProjectType } from "~/types"
import kyzn from "./kyzn"
import rileyBarabash from "./riley-barabash"

const parsedConfig = {
    kyzn: kyzn.schema.parse(kyzn.config),
    "riley-barabash": rileyBarabash.schema.parse(rileyBarabash.config)
}

const transformedConfig = {
    kyzn: kyzn.middleware(parsedConfig.kyzn),
    "riley-barabash": rileyBarabash.middleware(parsedConfig["riley-barabash"])
}

if (!process.env.NEXT_PUBLIC_PROJECT)
    throw new ConfigError({
        name: "ENVIRONMENT_VARIABLE_NOT_FOUND",
        message: "You forgot to configure the `PROJECT` environment variable."
    })

const currentProject = process.env.NEXT_PUBLIC_PROJECT as ProjectType

export const project = {
    ...transformedConfig[currentProject],
    ...transformedConfig,
    id: currentProject
}

export type Project = typeof project
