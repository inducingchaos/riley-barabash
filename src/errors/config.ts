/**
 * @file Custom errors for configurations.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #config
 * #custom-error
 * #errors
 */

import { Error } from "~/abstractions"

type EnvironmentVariableNotFound = "ENVIRONMENT_VARIABLE_NOT_FOUND"
type MissingConfigValue = "MISSING_CONFIG_VALUE"

type ErrorName = EnvironmentVariableNotFound | MissingConfigValue

export class ConfigError extends Error<ErrorName> {}
