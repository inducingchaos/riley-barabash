/**
 *
 */

import type { MessageInstance } from "twilio/lib/rest/api/v2010/account/message"
import { application } from "~/config"
import { twilio } from "~/lib/providers/comms"
import { Exception } from "~/meta"

export type SendMessageParams = {
    /**
     * The message to send.
     */
    content: string

    /**
     * The sending phone number in E.164 format.
     *
     * @remarks Defaults to the application config value.
     */
    from?: string

    /**
     * The recipient's phone number, or a group of numbers in E.164 format.
     */
    to: string | string[]

    /**
     * The URL of the media to attach to the message. Max 10.
     */
    mediaUrls?: string | string[]
}

/**
 * Sends a message to a single person or a small group of recipients.
 *
 * @remarks Returns an array of Twilio MessageInstance objects.
 */
export async function sendMessage({
    content,
    from: sender = application.credentials.public.twilio.number,
    to: recipients,
    mediaUrls
}: SendMessageParams): Promise<MessageInstance[]> {
    if (typeof recipients === "string") recipients = [recipients]
    if (typeof mediaUrls === "string") mediaUrls = [mediaUrls]

    try {
        const messages: MessageInstance[] = await Promise.all(
            recipients.map(async recipient => {
                const message = await twilio.messages.create({
                    from: sender,
                    to: recipient,
                    body: content,
                    mediaUrl: mediaUrls
                })
                return message
            })
        )

        return messages
    } catch (error) {
        throw new Exception({
            in: "comms",
            of: "send-failed",
            with: {
                internal: {
                    label: "Failed to Send SMS",
                    message: "Something went wrong sending the SMS."
                }
            },
            and: {
                error
            }
        })
    }
}
