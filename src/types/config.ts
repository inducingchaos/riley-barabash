/**
 * @file Config file types.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #types
 * #config
 */

import { type environments } from "~/constants"

export type Environment = (typeof environments)[number]
