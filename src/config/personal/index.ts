/**
 * @file The config for personal info.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #config
 * #personal
 */

import { middleware } from "./middleware"
import { schema, type Config } from "./schema"

export const config = {
    info: {
        name: "Riley Barabash",
        birthdate: "2004-04-30",
        hometown: "Westlock, AB"
    },

    dimensions: {
        height: "5'9\"",
        weight: "176lbs",
        shoeSize: "11.5"
    },

    appearance: {
        eyeColor: "blue",
        hairColor: "blonde",
        ethnicity: "white",
        tattoos: "none (yet)",
        piercings: "no"
    },

    lifestyle: {
        diet: "animal-based, whole foods, clean",
        sleep: "6.5h",
        exercise: "everyday"
    },

    socials: {
        username: "inducingchaos",
        bio: "Engineering self, designing systems, scaling precision.",
        introduction: "I'll let the stats do the talking."
    },

    contact: {
        email: "riley@rileybarabash.com",
        phone: "+1 (780) 379-0221"
    },

    stats: {
        kilometersRan: 950,
        minutesListened: 11576,
        pagesRead: 0,
        linesWritten: 376,
        videosPublished: 1154,
        postsCreated: 11408,
        dollarsMade: 37504113,
        carsOwned: 11,
        charactersTyped: 34878,
        followersEarned: 2
    },

    skills: [],
    interests: [],
    goals: [],
    achievements: [],
    regrets: [],
    lessons: [],
    quotes: []
} satisfies Config

export const personal = middleware(schema.parse(config))
export type Personal = typeof personal
