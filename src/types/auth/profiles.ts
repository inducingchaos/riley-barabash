/**
 *
 */

import type { profiles } from "~/server/data/schemas"

export type Profile = typeof profiles.$inferSelect
export type ProfileOptions = typeof profiles.$inferInsert
