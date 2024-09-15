/**
 *
 */

import { middleware } from "./middleware"
import { schema, type Config } from "./schema"

const config = {
    info: {
        name: "RILEY BARABASH",
        tagline: "Self, Systems, Scale.",
        description:
            "My name is Riley. Engineer of self-state, designer of systems, and architect of precision at scale. I take an interest in actualizing the unknown."
    },

    emails: {
        admin: "admin@rileybarabash.com",
        personal: "riley@rileybarabash.com",
        support: "support@rileybarabash.com"
    },

    links: {
        site: "https://rileybarabash.com",
        x: "https://x.com/inducingchaos",
        instagram: "https://instagram.com/inducingchaos",
        tiktok: "https://tiktok.com/inducingchaos",
        github: "https://github.com/inducingchaos"
    }
} satisfies Config

export default {
    config,
    middleware,
    schema
}
