/**
 *
 */

import { z } from "zod"

export const schema = z.object({
    info: z.object({
        name: z.string(),
        age: z.number().int().optional(),
        birthdate: z.string().date(),
        hometown: z.string()
    }),

    dimensions: z.object({
        height: z.string(),
        weight: z.string(),
        shoeSize: z.string()
    }),

    appearance: z.object({
        eyeColor: z.string(),
        hairColor: z.string(),
        ethnicity: z.string(),
        tattoos: z.string(),
        piercings: z.string()
    }),

    lifestyle: z.object({
        diet: z.string(),
        sleep: z.string(),
        exercise: z.string()
    }),

    socials: z.object({
        username: z.string(),
        bio: z.string(),
        introduction: z.string()
    }),

    contact: z.object({
        email: z.string(),
        phone: z.string()
    }),

    stats: z.object({
        kilometersRan: z.number().int(),
        minutesListened: z.number().int(),
        pagesRead: z.number().int(),
        linesWritten: z.number().int(),
        videosPublished: z.number().int(),
        postsCreated: z.number().int(),
        dollarsMade: z.number().int(),
        carsOwned: z.number().int(),
        charactersTyped: z.number().int(),
        followersEarned: z.number().int()
    }),

    skills: z.array(z.string()),
    interests: z.array(z.string()),
    goals: z.array(z.string()),
    achievements: z.array(z.string()),
    regrets: z.array(z.string()),
    lessons: z.array(z.string()),
    quotes: z.array(z.string())
})

export type Config = z.input<typeof schema>
