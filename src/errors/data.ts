/**
 *
 */

import { Error } from "~/meta"

type ResourceAlreadyExists = "RESOURCE_ALREADY_EXISTS"
type ResourceNotFound = "RESOURCE_NOT_FOUND"

type ErrorName = ResourceAlreadyExists | ResourceNotFound

export class DataError extends Error<ErrorName> {}
