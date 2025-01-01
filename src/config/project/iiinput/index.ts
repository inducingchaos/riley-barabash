/**
 *
 */

import { middleware } from "./middleware"
import { schema, type Config } from "./schema"

const config = {
    info: {
        name: "iiinput",
        tagline: "The AI layer for context management and task delegation.",
        description: ""
    },

    emails: {
        admin: "admin@iiinput.com",
        personal: "riley@iiinput.com",
        support: "support@iiinput.com"
    },

    links: {
        site: "https://iiinput.com",
        x: "https://x.com/iiinput",
        instagram: "https://instagram.com/iiinput",
        tiktok: "https://tiktok.com/iiinput",
        github: "https://github.com/iiinput"
    }
} satisfies Config

export default {
    config,
    middleware,
    schema
}
