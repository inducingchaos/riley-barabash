/**
 *
 */

import type { tokens } from "~/server/data/schemas"

export type Token = typeof tokens.$inferSelect
export type TokenOptions = typeof tokens.$inferInsert

export type TokenID = typeof tokens.$inferSelect.id
export type TokenValue = typeof tokens.$inferSelect.value

export const tokenTypes = ["password-reset", "email-verification", "magic-link"] as const
export type TokenType = (typeof tokenTypes)[number]
