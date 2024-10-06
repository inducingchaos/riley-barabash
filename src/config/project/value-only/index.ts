/**
 *
 */

import { middleware } from "./middleware"
import { schema, type Config } from "./schema"

const config = {
    info: {
        name: "Value-Only",
        tagline: "Distribute meaning.",
        description: "A tool for growing your personal brand without the overhead of social platforms."
    },

    emails: {
        admin: "admin@value-only.com",
        personal: "riley@value-only.com",
        support: "support@value-only.com"
    },

    links: {
        site: "https://value-only.com",
        x: "https://x.com/valueonlyapp",
        instagram: "https://instagram.com/valueonlyapp",
        tiktok: "https://tiktok.com/valueonlyapp",
        github: "https://github.com/valueonlyapp"
    }
} satisfies Config

export default {
    config,
    middleware,
    schema
}
