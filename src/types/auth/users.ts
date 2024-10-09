/**
 *
 */

import type { users } from "~/server/data/schemas"

export type UserID = number

export type User = typeof users.$inferSelect
export type UserOptions = typeof users.$inferInsert
