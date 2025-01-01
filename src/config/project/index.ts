/**
 *
 */

import type { Project as ProjectType } from "~/types"
import kyzn from "./kyzn"
import iiinput from "./iiinput"
import rileyBarabash from "./riley-barabash"
import valueOnly from "./value-only"
import { Exception } from "~/meta"

const parsedConfig = {
    kyzn: kyzn.schema.parse(kyzn.config),
    "riley-barabash": rileyBarabash.schema.parse(rileyBarabash.config),
    "value-only": valueOnly.schema.parse(valueOnly.config),
    iiinput: iiinput.schema.parse(iiinput.config)
}

const transformedConfig = {
    kyzn: kyzn.middleware(parsedConfig.kyzn),
    "riley-barabash": rileyBarabash.middleware(parsedConfig["riley-barabash"]),
    "value-only": valueOnly.middleware(parsedConfig["value-only"]),
    iiinput: iiinput.middleware(parsedConfig.iiinput)
}

if (!process.env.NEXT_PUBLIC_PROJECT)
    throw new Exception({
        in: "config",
        of: "missing-environment-variable",
        with: {
            internal: {
                label: "Missing Project Environment Variable",
                message: "You forgot to configure the `NEXT_PUBLIC_PROJECT` environment variable."
            }
        }
    })

const currentProject = process.env.NEXT_PUBLIC_PROJECT as ProjectType

export const project = {
    ...transformedConfig[currentProject],
    ...transformedConfig,
    id: currentProject
}

export type Project = typeof project
