/**
 *
 */

import { Error } from "~/meta"

type EnvironmentVariableNotFound = "ENVIRONMENT_VARIABLE_NOT_FOUND"
type MissingConfigValue = "MISSING_CONFIG_VALUE"

type ErrorName = EnvironmentVariableNotFound | MissingConfigValue

export class ConfigError extends Error<ErrorName> {}
