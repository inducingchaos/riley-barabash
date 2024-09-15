/**
 *
 */

import { Error } from "~/meta"

/**
 * Twilio failed to create the message.
 */
type MessageCreationFailed = "MESSAGE_CREATION_FAILED"

type ErrorName = MessageCreationFailed

export class SMSError extends Error<ErrorName> {}