/**
 * @file SMS-related errors.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #errors
 * #sms
 */

import { Error } from "~/abstractions"

/**
 * Twilio failed to create the message.
 */
type MessageCreationFailed = "MESSAGE_CREATION_FAILED"

type ErrorName = MessageCreationFailed

export class SMSError extends Error<ErrorName> {}
