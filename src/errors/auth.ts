/**
 *
 */

import { Error } from "~/meta"

type TokenExpired = "TOKEN_EXPIRED"
type EmailInUse = "EMAIL_IN_USE"
type InvalidCredentials = "INVALID_CREDENTIALS"
type DuplicateIdentifier = "DUPLICATE_IDENTIFIER"
type Unauthorized = "UNAUTHORIZED"
type Unauthenticated = "UNAUTHENTICATED"

type ErrorName = TokenExpired | EmailInUse | InvalidCredentials | DuplicateIdentifier | Unauthorized | Unauthenticated

export class AuthError extends Error<ErrorName> {}
