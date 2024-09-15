/**
 *
 */

import { type environments, type projects } from "~/constants"

export type Environment = (typeof environments)[number]
export type Project = (typeof projects)[number]
