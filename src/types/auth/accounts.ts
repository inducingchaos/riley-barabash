/**
 *
 */

import type { accounts } from "~/server/data/schemas"

export const accountTypes = ["email", "password", "google"] as const
export type AccountType = (typeof accountTypes)[number]

export type Account = typeof accounts.$inferSelect
export type AccountOptions = typeof accounts.$inferInsert
