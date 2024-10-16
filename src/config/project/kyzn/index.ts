/**
 *
 */

import { middleware } from "./middleware"
import { schema, type Config } from "./schema"

const config = {
    info: {
        name: "Kyzn",
        tagline: "Content at the speed of thought.",
        description:
            "We are the integration layer for your neurons. Store & organize data, compose content like a pro, and apply your knowledge with built-in systems."
    },

    emails: {
        admin: "admin@kyzn.app",
        personal: "riley@kyzn.app",
        support: "support@kyzn.app"
    },

    links: {
        site: "https://kyzn.app",
        x: "https://x.com/kyzdotapp",
        instagram: "https://instagram.com/kyzdotapp",
        tiktok: "https://tiktok.com/kyzdotapp",
        github: "https://github.com/kyzdotapp"
    }
} satisfies Config

export default {
    config,
    middleware,
    schema
}
