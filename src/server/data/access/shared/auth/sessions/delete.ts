/**
 *
 */

import { and, eq } from "drizzle-orm"
import { type MySqlColumn } from "drizzle-orm/mysql-core"
import type { Database } from "~/server/data"
import { sessions } from "~/server/data/schemas"
import type { Session } from "~/types/auth"

export async function deleteSessions({ where: query, in: db }: { where: Partial<Session>; in: Database }): Promise<void> {
    const where = Object.entries(query)
        .filter(([_, queryValue]) => queryValue !== undefined)
        .map(([queryKey, queryValue]) => eq(sessions[queryKey as keyof typeof sessions] as MySqlColumn, queryValue))

    await db.delete(sessions).where(and(...where))
}
