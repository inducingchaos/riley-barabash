/**
 * @file Constructs a `NAME — ORGANIZATION <EMAIL>` identifier for outgoing emails.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #utils
 * #comms
 * #email
 * #create-sender-identity
 *
 * @todo
 * - [P4] Review code.
 */

import { brand } from "~/config"

export const createSenderIdentity = ({
    name,
    organization = brand.info.name,
    email = brand.emails.support
}: {
    name?: string | null
    organization?: string | null
    email?: string
}): string => {
    //  Check if the name is missing

    if (name !== null && !name) {
        name = email

            //  Grab the first part of the email address

            .split("@")[0]!
            //  Split the string into words by non-alphanumeric characters

            .split(/[^a-zA-Z0-9]/)

            //  Capitalize the first letter of each word

            .map(word => word.charAt(0).toUpperCase() + word.slice(1))

            //  Join the words back together

            .join(" ")
    }

    switch (true) {
        //  Name and organization
        case name !== null && organization !== null:
            return `${name} — ${organization} <${email}>`

        //  Name only
        case name !== null:
            return `${name} <${email}>`

        //  Organization only
        case organization !== null:
            return `${organization} <${email}>`

        //  No identifier
        default:
            return `<${email}>`
    }
}
